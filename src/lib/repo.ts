/**
 * Partially represents the data model return by https://api.github.com/users/{user}/repos
 */
export interface Repo{
    name: string,
    html_url: string,
    description: string,
    pushed_at: string,
    language: string,
}