import { Component } from "~/model/Component";

export const whenServedComponent = new Component({
    id: "meals-when-served",
    name: "Meals When Served",
    tags: ["meals"],
    description: `Component for getting unique when_served values.`,
    html: "",
    css: "",
    js: "",
    sql: `SELECT DISTINCT doba_podavani AS doba_podavani FROM jidla ORDER BY doba_podavani`
});
