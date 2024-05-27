set -e

template=$1

plan(){
    perl -pe "s/(?<=\.)Template/$1/g" $template |
    perl -pe "s/(?<=family = \")\w+/$2/" |
    perl -pe "s/(?<=shape = )\d+/$3/" > $(dirname $template)/$1.toml
}

plan iosevka "Iosevka Custom" 500
plan iosevka-extended "Iosevka Custom Extended" 600
