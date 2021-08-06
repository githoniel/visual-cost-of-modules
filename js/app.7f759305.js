(()=>{"use strict";var e={1741:(e,t,a)=>{a(6992),a(8674),a(7727);var n=a(7294),r=a(3935),s=(a(3666),a(4178)),c=(a(3948),a(8818),a(5779)),l=(a(62),a(8222)),i=(a(7940),a(817)),o=(a(5891),a(7933));const u=[{key:"dist-tags",tab:"By Tags"},{key:"versions",tab:"All Versions"}];function d({searchResult:e,setTargetVersion:t}){const[a,r]=(0,n.useState)("dist-tags"),[s,c]=(0,n.useState)(),d=e=>{c(e.target.value)},m=(0,n.useMemo)((()=>({"dist-tags":n.createElement(o.ZP.Group,{onChange:d},Object.keys(e["dist-tags"]).map((t=>{const a=e["dist-tags"][t];return n.createElement(o.ZP,{value:a,key:a},`${t}: ${a}`)}))),versions:n.createElement(o.ZP.Group,{onChange:d},Object.keys(e.versions).map((e=>n.createElement(o.ZP,{value:e,key:e},e))))})),[e]),p=e=>{r(e)},h=()=>{t(s)};return n.createElement(n.Fragment,null,n.createElement(i.Z,{style:{width:"100%",zIndex:99},title:"Choose package version",className:"version-choose",tabList:u,activeTabKey:a,onTabChange:e=>{p(e)}},n.createElement("div",{className:"version-radio"},m[a]),n.createElement("div",{className:"bottom-controller"},n.createElement("span",{className:"selected-version"},"Selected:","  ",s),n.createElement(l.Z,{type:"primary",disabled:!s,onClick:h},"Confirm"))))}a(3381);var m=a(7808),p=a(9669),h=a.n(p),g=a(5775),v=a.n(g);class f{constructor({registry:e,timeout:t}={}){this.registry="https://registry.npmjs.cf/",this.timeout=0,this.cache={},e&&(this.registry=e),t&&(this.timeout=t)}async getMetadata(e,t={}){const{version:a}=t,n=a?`${window.encodeURIComponent(e)}/${window.encodeURIComponent(a)}`:`${window.encodeURIComponent(e)}`,r=await h().get(`${this.registry}${n}`,{timeout:this.timeout});return r.data}async getDepsPkgInfo(e,t){let a;const n=`${e}@${t}`;if(this.cache[n])return this.cache[n];{a=await this.getMetadata(e);const r=Object.keys(a.versions),s="latest"===t?a["dist-tags"][t]:v()(r,t),c=a.versions[s];if(!c)throw new Error(`${n} no found in registry`);return this.cache[n]=c,c}}}function E(){const[e]=(0,n.useState)((()=>new f({registry:"https://registry.npmjs.cf/"})));return{pm:e}}const y=(0,n.createContext)(void 0),k=()=>(0,n.useContext)(y);var S;function b(){const[e,t]=(0,n.useState)(S.Idle),[a,r]=(0,n.useState)(null),{pm:s}=k(),c=(0,n.useCallback)((async e=>{t(S.Searching),r(null);try{const a=await s.getMetadata(e);r(a),t(S.Succ)}catch(a){m.ZP.error(a.message),r(a),t(S.Fail)}}),[]);return(0,n.useEffect)((()=>{e===S.Idle&&r(null)}),[e]),{searchState:e,searchResult:a,execSearch:c,setSearchResult:r,setSearchState:t}}(function(e){e[e["Idle"]=0]="Idle",e[e["Searching"]=1]="Searching",e[e["Succ"]=2]="Succ",e[e["Fail"]=3]="Fail"})(S||(S={}));const{Search:w}=c.Z;function C({setTargetName:e,setTargetVersion:t}){const{searchState:a,searchResult:r,execSearch:c,setSearchState:l}=b(),i=a=>{a&&(e(""),t(""),c(a))},o=a=>{l(S.Idle),e(r.name),t(a)};return n.createElement(s.Z.Header,null,n.createElement(w,{style:{marginTop:"15px"},placeholder:"input package name",enterButton:!0,loading:a===S.Searching,onSearch:i}),a===S.Succ&&r&&n.createElement(d,{searchResult:r,setTargetVersion:o}))}var N=a(9058),x=a.n(N),Z=a(5184),z=a.n(Z),I=a(728),F=a.n(I),O=a(703),P=a.n(O);x().use(P()),x().use(z()),x().use(F());const $={Concentric:"concentric",FCose:"fcose",Force:"force",Cola:"cola"},j={[$.Concentric]:{name:"concentric",concentric(e){return 100-e.scratch().depLevel},levelWidth(){return 1}},[$.FCose]:{name:"fcose",quality:"proof",nodeDimensionsIncludeLabels:!0},[$.Force]:{name:"fcose",async:{maxIterations:1e3,stepsPerCycle:30,waitForStep:!1},physics:{springLength:100,springCoeff:8e-4,gravity:-1.2,theta:.8,dragCoeff:.02,timeStep:20,iterations:1e4,fit:!0,stableThreshold:9e-6},iterations:1e4,refreshInterval:16,refreshIterations:10,stableThreshold:2,animate:!0,fit:!0},[$.Cola]:{name:"cola"}};function T(){return n.createElement("div",{id:"no-thing"})}var q,L=a(7187);(function(e){e["Progress"]="progress",e["Data"]="data",e["Error"]="Error",e["End"]="end"})(q||(q={}));class R extends L.EventEmitter{constructor(e){super(),this.option=e,this.option=e}dispatch(e,t){this.emit(e,t)}onEvent(e,t){return this.on(e,t),this}}const B=["#04b5e5","#ffd148","#ef7e48","#50e3c2","#42aae6"];function D(e){return B[e%B.length]}function V({pm:e,name:t,version:a,fixedSize:n}){const r=new R({fixedSize:n});return _(r,e,t,a),r}async function _(e,t,a,n){e.dispatch(q.Progress,{count:1,level:0});const r=await t.getMetadata(a,{version:n}),s=U(e,r,0),c=s.data.id;e.dispatch(q.Data,{nodes:[s],edges:[]});const l={level:1,taskHistory:{[c]:!0},task:H(c,r.dependencies)};M(e,t,l)}async function M(e,t,a){const n=a.task,r=a.level;a.task=[],a.level+=1;const s=[],c=[];e.dispatch(q.Progress,{count:n.length,level:r}),await Promise.all(n.map((async({name:n,requiredVersion:l,requiredBy:i})=>{const o=await t.getDepsPkgInfo(n,l),u=U(e,o,r),d=u.data.id;a.taskHistory[d]||(a.taskHistory[d]=!0,s.push(u),a.task=[...a.task,...H(d,o.dependencies,a.taskHistory)]),c.push({data:{id:`${d} -> ${i}`,source:d,target:i}})}))).catch((t=>{throw e.dispatch(q.Error,t),t})),e.dispatch(q.Data,{nodes:s,edges:c}),a.task.length>0?M(e,t,a):(a.taskHistory={},e.dispatch(q.End))}function U(e,t,a){t.dist.size=t.dist.size||t.dist.unpackedSize;const n=`${t.name}@${t.version}`,r=e.option.fixedSize?5:Math.max(t.dist.size/20480,5);return{data:{id:n},scratch:{displaySize:r,depLevel:a,detail:t},style:{height:Number.isNaN(r)?5:r,width:Number.isNaN(r)?5:r,"background-color":D(a)}}}function H(e,t,a={}){return t?Object.keys(t).map((n=>{if(a[n])return null;const r=t[n];return{name:n,requiredVersion:r,requiredBy:e}})).filter(G):[]}function G(e){return null!==e&&void 0!==e}a(4346);var A=a(6772);function K({message:e,status:t}){let a;switch(t){case S.Searching:a="info";break;case S.Succ:a="success";break;case S.Fail:a="error";break}const[r,s]=(0,n.useState)(!1);return(0,n.useEffect)((()=>{let e;return s(!1),"success"===a&&(e=window.setTimeout((()=>{s(!0)}),3e3)),()=>{clearTimeout(e)}}),[a]),n.createElement(n.Fragment,null,a&&!r&&n.createElement(A.Z,{message:e,closable:"success"===a,type:a}))}var W=a(4549),J=a(8600),Q=a.n(J);function X({info:e,cyInstance:t}){const[a,r]=(0,n.useState)(!1);(0,n.useEffect)((()=>{e&&r(!0)}),[e]);const s=()=>{r(!1)},c=!!e.detail,o=e,u=e,d=e=>{if(t){const a=t.getElementById(e);a&&t.fit(a)}};return console.log(e),n.createElement(n.Fragment,null,a&&n.createElement(i.Z,{size:"small",className:"pkg-info-card",title:c?o.detail.name:"Dependency",extra:n.createElement(l.Z,{type:"text",shape:"circle",icon:n.createElement(W.Z,{onClick:s})})},c?n.createElement(n.Fragment,null,n.createElement("p",{className:"line"},n.createElement("div",{className:"title"},"version"),n.createElement("div",{className:"value"},o.detail.version)),n.createElement("p",{className:"line"},n.createElement("div",{className:"title"},"size"),n.createElement("div",{className:"value"},o.detail.dist.size?Q()(o.detail.dist.size):"unknown")),n.createElement("p",{className:"line"},n.createElement("div",{className:"title"},"tarball"),n.createElement("div",{className:"value"},n.createElement("a",{href:o.detail.dist.tarball},"click to download"))),n.createElement("p",{className:"line"},n.createElement("div",{className:"title"},"npm page"),n.createElement("div",{className:"value"},n.createElement("a",{href:`https://www.npmjs.com/${o.detail.name}`,target:"_blank",rel:"noreferrer"},"click to visite"))),n.createElement("p",{className:"line"},n.createElement("div",{className:"title"},"require"),n.createElement("div",{className:"value"},o.requirePkg.map((e=>n.createElement(l.Z,{type:"text",onClick:()=>d(e)},e))))),n.createElement("p",{className:"line"},n.createElement("div",{className:"title"},"required by"),n.createElement("div",{className:"value"},o.requiredByPkg.map((e=>n.createElement(l.Z,{type:"text",onClick:()=>d(e)},e)))))):n.createElement(n.Fragment,null,n.createElement("p",{className:"line"},n.createElement("div",{className:"title"},"package"),n.createElement("div",{className:"value"},n.createElement(l.Z,{type:"text",onClick:()=>d(u.source)},u.source))),n.createElement("p",{className:"line"},n.createElement("div",{className:"title"},"required by"),n.createElement("div",{className:"value"},n.createElement(l.Z,{type:"text",onClick:()=>d(u.target)},u.target))))))}function Y({name:e,version:t,fixedSize:a,layoutOption:r,cyInstance:s,setCyInstance:c}){const[l,i]=(0,n.useState)("Loading"),[o,u]=(0,n.useState)(S.Idle),[d,m]=(0,n.useState)(),{pm:p}=k();return(0,n.useEffect)((()=>{const n=x()({container:document.getElementById("dep-graph"),elements:{nodes:[]},style:[{selector:"node",style:{label:"data(id)","font-size":"6px",color:"#333","text-valign":"center","text-halign":"right",shape:"ellipse"}},{selector:"node:selected",style:{"border-width":"1","border-color":"red","border-style":"solid"}},{selector:"edge",style:{width:.5,"line-color":"#ccc","font-size":"6px","target-arrow-color":"#ccc","target-arrow-shape":"triangle-backcurve","curve-style":"bezier","arrow-scale":.5}},{selector:"edge:selected",style:{"line-color":"red",width:1}}]}),s=V({pm:p,name:e,version:t,fixedSize:a});return s.onEvent(q.Error,(e=>{u(S.Fail),i(e.stack||e.message)})).onEvent(q.Progress,(e=>{u(S.Searching),i(`Loading ${e.count} dependencies of the ${e.level+1} level...`)})).onEvent(q.End,(()=>{u(S.Succ),i("Load dependencies done"),n.elements().off("click").on("click",(e=>{const{target:t}=e;if(t.isEdge())m({source:t.source().data().id,target:t.target().data().id});else if(t.isNode()){const e=t.scratch(),{id:a}=t.data(),n=[],r=[];t.connectedEdges().forEach((e=>{const t=e.source().data().id,s=e.target().data().id;t===a?r.push(s):n.push(t)})),m({...e,requirePkg:n,requiredByPkg:r})}}))})).onEvent(q.Data,(e=>{n.add(e),n.layout(r).run()})),c(n),()=>{n.unmount(),c(void 0)}}),[]),n.createElement(n.Fragment,null,n.createElement(K,{message:l,status:o}),d&&n.createElement(X,{info:d,cyInstance:s}),n.createElement("div",{id:"dep-graph"}))}a(1388);var ee=a(9676),te=(a(2953),a(9288)),ae=(a(9793),a(144)),ne=a(4616);const{Option:re}=ae.Z;function se({layoutOption:e,cyInstance:t,setLayoutOption:a,setFixedSize:r,forceUpdate:s}){const{pm:c}=k(),[o,u]=(0,n.useState)(!1),d=()=>{u(!0)},m=()=>{u(!1)};function p(e){a(j[e]),t&&t.layout(j[e]).run()}const h=()=>{if(t){const e=t.elements()[0];t.fit(e,100)}},g=()=>{t&&t&&t.layout(e).run()},v=e=>{const t=e.target.checked;r(!t),s()},f=e=>{console.log(e),c.registry=e,c.cache={}};return n.createElement(n.Fragment,null,n.createElement("div",{className:"draw-opener"},n.createElement(l.Z,{type:"text",shape:"circle",size:"large",icon:n.createElement(ne.Z,{style:{fontSize:"24px",color:"#08c"},onClick:d})})),o&&n.createElement(i.Z,{className:"draw-setting",size:"small",title:"Graph",extra:n.createElement(l.Z,{type:"text",shape:"circle",icon:n.createElement(W.Z,{onClick:m})}),style:{width:400}},n.createElement("div",null,n.createElement("span",null,"Registry:"),n.createElement(te.Z,{options:[{value:"https://r.cnpmjs.org/"},{value:"https://registry.npm.taobao.org/"},{value:"https://registry.npmjs.cf/"}],defaultValue:c.registry,style:{width:200},onSelect:f,onChange:f,placeholder:"input registry, end with `/`"})),n.createElement("br",null),n.createElement("div",null,n.createElement("span",null,"Layout:"),n.createElement(ae.Z,{defaultValue:e.name,style:{width:120},onChange:p},Object.keys($).map((e=>n.createElement(re,{value:$[e],key:e},e))))),n.createElement("br",null),n.createElement("div",null,n.createElement("span",null,"DisplaySize:"),n.createElement(ee.Z,{defaultChecked:!0,onChange:v},"package size")),n.createElement("br",null),n.createElement("div",null,n.createElement(l.Z,{onClick:h},"Back to Root"),n.createElement("span",null," "),n.createElement(l.Z,{onClick:g},"Refresh Layout"))))}function ce(){const[e,t]=(0,n.useState)(0),[a,r]=(0,n.useState)((()=>t));return(0,n.useEffect)((()=>(r((()=>t)),()=>{r((()=>()=>{}))})),[]),{updateFlag:e,forceUpdate:()=>{a((e=>e+1))}}}function le({name:e,version:t}){const[a,r]=(0,n.useState)(j[$.Cola]),[s,c]=(0,n.useState)(!1),[l,i]=(0,n.useState)(),{updateFlag:o,forceUpdate:u}=ce();return n.createElement(n.Fragment,null,n.createElement(se,{layoutOption:a,setLayoutOption:r,cyInstance:l,setFixedSize:c,forceUpdate:u}),e&&t?n.createElement(Y,{key:o,name:e,version:t,fixedSize:s,layoutOption:a,cyInstance:l,setCyInstance:i}):n.createElement(T,null))}function ie(){const[e,t]=(0,n.useState)(""),[a,r]=(0,n.useState)("");return n.createElement(y.Provider,{value:E()},n.createElement(s.Z,{style:{height:"100vh"}},n.createElement(C,{setTargetName:t,setTargetVersion:r}),n.createElement(s.Z.Content,null,n.createElement(le,{name:e,version:a}))))}(0,r.render)(n.createElement(ie,null),document.querySelector("#root"))}},t={};function a(n){var r=t[n];if(void 0!==r)return r.exports;var s=t[n]={exports:{}};return e[n].call(s.exports,s,s.exports,a),s.exports}a.m=e,(()=>{var e=[];a.O=(t,n,r,s)=>{if(!n){var c=1/0;for(u=0;u<e.length;u++){for(var[n,r,s]=e[u],l=!0,i=0;i<n.length;i++)(!1&s||c>=s)&&Object.keys(a.O).every((e=>a.O[e](n[i])))?n.splice(i--,1):(l=!1,s<c&&(c=s));if(l){e.splice(u--,1);var o=r();void 0!==o&&(t=o)}}return t}s=s||0;for(var u=e.length;u>0&&e[u-1][2]>s;u--)e[u]=e[u-1];e[u]=[n,r,s]}})(),(()=>{a.n=e=>{var t=e&&e.__esModule?()=>e["default"]:()=>e;return a.d(t,{a:t}),t}})(),(()=>{a.d=(e,t)=>{for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}})(),(()=>{a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()})(),(()=>{a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)})(),(()=>{var e={143:0};a.O.j=t=>0===e[t];var t=(t,n)=>{var r,s,[c,l,i]=n,o=0;for(r in l)a.o(l,r)&&(a.m[r]=l[r]);if(i)var u=i(a);for(t&&t(n);o<c.length;o++)s=c[o],a.o(e,s)&&e[s]&&e[s][0](),e[c[o]]=0;return a.O(u)},n=self["webpackChunkvisual_cost_of_modules"]=self["webpackChunkvisual_cost_of_modules"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var n=a.O(void 0,[998],(()=>a(1741)));n=a.O(n)})();