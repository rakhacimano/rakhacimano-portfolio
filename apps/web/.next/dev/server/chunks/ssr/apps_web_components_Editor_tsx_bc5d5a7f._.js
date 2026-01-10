module.exports = [
"[project]/apps/web/components/Editor.tsx [app-ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/node_modules_prosemirror-view_dist_index_539b14af.js",
  "server/chunks/ssr/node_modules_@tiptap_core_dist_08fee8dc._.js",
  "server/chunks/ssr/node_modules_e7f428c5._.js",
  "server/chunks/ssr/apps_web_components_Editor_tsx_82dce475._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/apps/web/components/Editor.tsx [app-ssr] (ecmascript)");
    });
});
}),
];