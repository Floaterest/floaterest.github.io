/**
 * Partially represents the data model return by https://api.github.com/users/{user}/repos
 */
export interface Repo{
    html_url: string,
    full_name: string,
    description: string,
    pushed_at: string,
    language: string,
}