/**
 * Represents a component with its associated properties and content.
 */
export interface IComponent {
    Id: string;
    Name: string;
    Description: string;
    Html: Record<string, string>;
    Css: Record<string, string>;
    Js: Record<string, string>;
    Sql: Record<string, string>;
    Edited: boolean;
}
