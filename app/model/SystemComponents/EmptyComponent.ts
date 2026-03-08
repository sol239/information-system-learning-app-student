import { Component } from "~/model/Component";

export const emptyComponent = new Component({
    id: "empty",
    name: "Empty",
    description: "Empty fallback component",
    html: "",
    css: "",
    js: "",
    sql: "",
    tags: [],
});
