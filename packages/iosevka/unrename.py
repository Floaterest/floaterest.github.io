#!/usr/bin/env python
import os
import re
import json
from argparse import ArgumentParser

import fontforge

EXT = '.ttf'

weight = re.compile(r'(Heavy|(Extra|Semi)bold|Medium|Thin)')
light = re.compile(r'(Extralight|Light)')

data = {}

def to_names(filename: str) -> (str, str, str):
    """
    generate names from font's filename
    :return: fontfamily, fontname, fullname
    """
    full = ['Iosevka']
    family = full[:]
    if 'Extended' in filename:
        full.append('Extended')
        family.append('Ext')
    if w := weight.search(filename):
        full.append(w.group())
        family.append(w.group())
    elif l := light.search(filename):
        full.append(l.group())
        # family.append(l.group().lower().replace('light','lite').capitalize())
        family.append(l.group().lower().capitalize())
    if 'Italic' in filename:
        full.append('Italic')
    if 'Bold' in filename:
        full.append('Bold')
    name = full[:]
    family.append('NF')
    name.append('NF')
    full.extend(['Nerd', 'Font', 'Complete'])
    return ' '.join(family), '-'.join(name), ' '.join(full)


def new_sfnt(sfnt, family, font, full):
    replace = {
        "Family": family,
        "UniqueID": font,
        "Fullname": full,
        "Preferred Family": family,
        "WWS Family": family,
    }
    res = []
    for name in sfnt:
        if name[1] in replace:
            res.append((name[0], name[1], replace[name[1]]))
        else:
            res.append(name)
    return tuple(res)

def main(srcdir: str, destdir: str):
    os.makedirs(destdir, exist_ok=True)
    for file in os.listdir(srcdir):
        if file.endswith(EXT):
            f = fontforge.open(os.path.join(srcdir, file))
            f.familyname, f.fontname, f.fullname = to_names(file)
            f.sfnt_names = new_sfnt(f.sfnt_names, f.familyname, f.fontname, f.fullname)

            if f.familyname in data:
                data[f.familyname].append([f.fontname, f.fullname, f.sfnt_names])
            else:
                data[f.familyname] = [[f.fontname, f.fullname, f.sfnt_names]]
            f.generate(os.path.join(destdir, f.fullname + EXT))

    with open(os.path.join(destdir, 'iosevka.json'),'w') as f:
        json.dump(data, f, indent=4)

if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('src', help='source/input directory')
    parser.add_argument('dest', help='destination/output directory')
    args = parser.parse_args()
    main(args.src, args.dest)
