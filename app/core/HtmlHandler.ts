import type { ComponentVariables } from "~/model/ComponentVariables";

export class HtmlHandler {
    public static ReplaceHtmlForVariables(variables: ComponentVariables, html: string): string {
        return this.replaceVariables(variables, html, true);
    }

    public static ReplaceTextForVariables(variables: ComponentVariables, text: string): string {
        return this.replaceVariables(variables, text, false);
    }

    private static replaceVariables(variables: ComponentVariables, source: string, protectSystemIds: boolean): string {
        if (!source) return "";

        let result = source;
        // Merge with priority: general < sql < js (later entries win)
        const allVariables = [...(variables.generalVariables ?? []), ...(variables.sqlVariables ?? []), ...(variables.jsVariables ?? [])];

        for (const { name: key, variable: value } of allVariables) {
            // Match bare varName only – no {{ }} syntax
            const escapedKey = key.replace(/([\\$])/g, '\\$1');
            const systemPrefixGuard = protectSystemIds ? '(?<!system-)' : '';
            const regex = new RegExp(`${systemPrefixGuard}(?<![a-zA-Z0-9_$])${escapedKey}(?![a-zA-Z0-9_$])`, 'g');

            let stringValue = "";
            if (Array.isArray(value)) {
                stringValue = value.map(v => v instanceof Date ? v.toISOString() : String(v)).join(", ");
            } else if (value instanceof Date) {
                stringValue = value.toISOString();
            } else if (value !== null && value !== undefined) {
                stringValue = String(value);
            }

            result = result.replace(regex, stringValue);
        }

        return result;
    }
}
