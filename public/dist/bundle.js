webpackJsonp([0],{0:function(t,e,n){"use strict";var o=n(2),s=n(3),r=n(6),a=n(13),i="undefined"!=typeof window,c=n(15),u=n(17),p=n(18),l=n(16),h=n(19);a.setRoutes(n(14));var m=s.createClass({displayName:"App",mixins:[r.ListenerMixin],propTypes:{path:s.PropTypes.string.isRequired},getInitialState:function(){return{path:!1}},componentDidMount:function(){window.addEventListener("popstate",this.onLocationChanged,!1),this.listenTo(c.locationChange,this.onLocationChanged)},componentWillUnmount:function(){window.removeEventListener("popstate",this.onLocationChanged,!1)},onLocationChanged:function(){this.setState({path:window.location.pathname+window.location.search})},render:function(){var t=a.match(this.state.path||this.props.path);return t?new t.page(o.merge({},this.state,{query:t.query||{},route:t.route||{}})):(console.error("Could not match URL ("+this.props.path+")"),null)}});p.listen(),h.listen(),i&&(window.React=s,l.fetchComponents(),u.listen(function(){s.renderComponent(new m({path:window.location.pathname+window.location.search}),document.getElementById("root"))})),t.exports=m},13:function(t,e,n){"use strict";function o(t,e){var n,o=t.match(/(:[a-zA-Z0-9]+)/g),s=new RegExp("^"+t.replace(/(:[a-zA-Z0-9]+)/g,"(.*?)")+"$"),r=e.match(s),a={};if(!r)return null;for(var i=1;i<r.length;i++)n=o[i-1].substring(1),a[n]=decodeURIComponent(r[i]);return a}var s=/(?:^|&)([^&=]*)=?([^&]*)/g,r=n(15),a={},i={setRoutes:function(t){a=t},match:function(t){var e,n,r=t.split("?"),i=r[1]||"",c=r[0],u={};i.replace(s,function(t,e,n){e&&(u[e]=n)});for(e in a)if(n=o(e,c))return{route:n,query:u,page:a[e]};return null},locationChanged:function(){r.locationChange()}};t.exports=i},14:function(t,e,n){"use strict";var o=n(25),s=n(26),r=n(27);t.exports={"/":o,"/search/:query":s,"/component/:componentName":r}},15:function(t,e,n){"use strict";var o=n(6);t.exports=o.createActions(["locationChange"])},16:function(t,e,n){"use strict";var o=n(6);t.exports=o.createActions(["fetchComponents","fetchFailed","componentsFetched","fetchComponentInfo","fetchComponentFailed","componentFetched"])},17:function(t,e,n){"use strict";var o=n(2),s=n(5),r=n(6),a=n(16),i=r.createStore({init:function(){this.components={},this.componentSummaries=[],this.listenTo(a.componentsFetched,this.populate),this.listenTo(a.componentFetched,this.addComponentInfo)},get:function(t){return this.components[t]?this.components[t]:void a.fetchComponentInfo(t)},getAll:function(){return this.components},getSummaries:function(){return this.componentSummaries},getMostRecentlyCreated:function(t){return o.sortBy(this.componentSummaries,"created").reverse().slice(0,t||10)},getMostRecentlyUpdated:function(t){var e=this.getMostRecentlyCreated(),n=o.sortBy(this.componentSummaries,"modified").reverse();return o.without.apply(null,[n].concat(e)).slice(0,t||10)},populate:function(t){t.map(this.addComponent),this.trigger("change")},parseComponent:function(t){return t.modified=s.utc(t.modified),t.created=s.utc(t.created),t},addComponent:function(t){t=this.parseComponent(t),this.componentSummaries.push(t)},addComponentInfo:function(t){this.components[t.name]=t,this.trigger("change")}});t.exports=o.bindAll(i)},18:function(t,e,n){"use strict";var o=n(2),s=(n(6),n(16)),r=n(1),a=!1,i={fetchComponents:function(){a=!0,r({url:"/api/components",json:!0},function(t,e,n){if(t)return s.fetchFailed(t);var r=o.partial(o.zipObject,n.keys),i=o.map(n.items,r);a=!1,s.componentsFetched(i)})},fetchComponentInfo:function(t){r({url:"/api/components/"+encodeURIComponent(t),json:!0},function(t,e,n){return t?s.fetchComponentFailed(t):void s.componentFetched(n)})},listen:function(){s.fetchComponents.shouldEmit=function(){return!a},s.fetchComponents.listen(i.fetchComponents),s.fetchComponentInfo.listen(i.fetchComponentInfo)}};t.exports=i},19:function(t,e,n){"use strict";function o(){return r(function(){this.field("name",{boost:10}),this.field("keywords",{boost:5}),this.field("description")})}var s=n(2),r=n(4),a=n(17),i=o(),c={listen:function(){a.listen(this.onComponentsChanged)},onComponentsChanged:function(){var t=a.getSummaries();i=o(),t.map(this.indexComponent)},indexComponent:function(t,e){i.add({id:e,name:t.name,keywords:t.keywords.join(" "),description:t.description})},filter:function(t){var e=a.getSummaries();return i.search(t).map(function(t){return s.merge(e[t.ref],t)})}};t.exports=s.bindAll(c)},25:function(t,e,n){"use strict";function o(){return{recentlyCreated:c.getMostRecentlyCreated(),recentlyUpdated:c.getMostRecentlyUpdated()}}var s=n(37),r=n(6),a=n(69),i=n(71),c=n(17),u=s.createClass({displayName:"FrontPage",mixins:[r.ListenerMixin],getInitialState:function(){return o()},componentDidMount:function(){this.listenTo(c,this.onComponentsChanged)},onComponentsChanged:function(){this.setState(o)},render:function(){return a({className:"front",query:this.props.route.query},s.DOM.h1(null,"Searchable database of ",s.DOM.a({href:"http://facebook.github.io/react/"},"React")," components"),s.DOM.hr(null),s.DOM.section({className:"faq"},s.DOM.h2(null,"How it works"),s.DOM.p(null,"Every module registered on ",s.DOM.a({href:"https://www.npmjs.org/"},"NPM")," using the keyword ",s.DOM.a({href:"https://www.npmjs.org/browse/keyword/react-component",className:"emphasize"},"react-component")," will show up in the list. It really is that simple."),s.DOM.h2(null,"How do I add my component to the list?"),s.DOM.ol(null,s.DOM.li(null,"Ensure your ",s.DOM.em({className:"emphasize"},"package.json")," file contains an array of keywords which includes ",s.DOM.em({className:"emphasize"},"react-component"),"."),s.DOM.li(null,"Publish your component to NPM (learn how at ",s.DOM.a({href:"https://www.npmjs.org/doc/cli/npm-publish.html"},"npmjs.org"),")."),s.DOM.li(null,"Wait for it to show up! Shouldn't take longer than 10-15 minutes.")),s.DOM.h2(null,"Missing any features?"),s.DOM.p(null,s.DOM.a({href:"https://github.com/vaffel/react-components/issues"},"Let us know"),"! We're always looking for ways to improve."),s.DOM.h2(null,"Who made this? Can I contribute?"),s.DOM.p(null,"Developed and currently hosted by ",s.DOM.a({href:"http://vaffel.ninja/"},"VaffelNinja"),", but it's an open-source, MIT-licensed solution."),s.DOM.p(null,"Contributions are ",s.DOM.a({href:"https://github.com/vaffel/react-components"},"very welcome"),"! Please make sure you read the ",s.DOM.a({href:"https://github.com/vaffel/react-components/blob/master/CONTRIBUTING.md"},"contribution guidelines"),".")),s.DOM.section({className:"component-lists"},i({listName:"Latest components",className:"latest-components",components:this.state.recentlyCreated}),i({listName:"Recently updated",className:"modified-components",components:this.state.recentlyUpdated})))}});t.exports=u},26:function(t,e,n){"use strict";var o=n(2),s=n(37),r=n(69),a=n(70),i=n(19);t.exports=s.createClass({displayName:"SearchPage",getInitialState:function(){return{sortBy:"score",sortOrder:"asc"}},getSearchResults:function(){var t=i.filter(this.props.route.query),e=o.sortBy(t,this.state.sortBy);return"desc"===this.state.sortOrder?e:e.reverse()},shouldComponentUpdate:function(t,e){return this.props.route.query!==t.route.query||this.state.sortBy!==e.sortBy||this.state.sortOrder!==e.sortOrder},onSortClicked:function(t){var e={sortBy:t};t===this.state.sortBy&&(e.sortOrder="asc"===this.state.sortOrder?"desc":"asc"),this.setState(e)},render:function(){return r({className:"search",query:this.props.route.query},a({onSortClicked:this.onSortClicked,results:this.getSearchResults()}))}})},27:function(t,e,n){"use strict";function o(t){return{componentInfo:u.get(t)}}var s=n(37),r=n(6),a=n(72),i=n(69),c=n(73),u=n(17),p=n(74),l=n(75);t.exports=s.createClass({displayName:"ComponentInfo",mixins:[r.ListenerMixin],getInitialState:function(){return o(this.props.route.componentName)},componentDidMount:function(){this.listenTo(u,this.onComponentInfoChanged)},onComponentInfoChanged:function(){this.setState(o(this.props.route.componentName))},getGithubUrl:function(){var t=p(this.state.componentInfo);return t?"https://github.com/"+t:!1},getHomepageButton:function(){var t=this.getGithubUrl(),e=this.state.componentInfo.homepage||"";return e.match(/https?:\/\//i)&&t!==e?s.DOM.a({href:e,className:"pure-button"},s.DOM.i({className:"fa fa-globe"})," Homepage"):null},getGithubButton:function(){var t=this.getGithubUrl();return t?s.DOM.a({href:t,className:"pure-button"},s.DOM.i({className:"fa fa-github"})," GitHub"):null},getGithubStarsButton:function(){var t=this.getGithubUrl();return t?s.DOM.a({title:"Number of stars on Github",href:t+"/stargazers",className:"pure-button"},s.DOM.i({className:"fa fa-star"})," ",l(this.state.componentInfo.starCount||0)):null},getDownloadsButton:function(){return s.DOM.a({title:"Downloads last week",href:"https://www.npmjs.org/package/"+this.state.componentInfo.name,className:"pure-button"},s.DOM.i({className:"fa fa-arrow-circle-o-down"})," ",l(this.state.componentInfo.downloads||0))},render:function(){return i({className:"component-info",query:this.props.route.componentName,autoFocusSearch:!1},this.state.componentInfo?s.DOM.div(null,s.DOM.aside(null,s.DOM.div({className:"toolbar"},this.getGithubButton(),this.getHomepageButton(),this.getGithubStarsButton(),this.getDownloadsButton())),c({component:this.state.componentInfo})):a(null))}})},37:function(t,e,n){t.exports=n(29)},69:function(t,e,n){"use strict";var o=n(37),s=n(136),r=n(137),a=n(138),i=n(139),c=n(140);t.exports=o.createClass({displayName:"Layout",render:function(){return o.DOM.div(null,o.DOM.header(null,a(null,i(null),o.DOM.h1(null,o.DOM.a({href:"/"},s["page-title"])),c({query:this.props.query||"",autoFocus:this.props.autoFocusSearch}))),o.DOM.main(null,a({className:this.props.className||""},this.props.children)),r(null))}})},70:function(t,e,n){"use strict";var o=n(37),s=n(141),r=n(142);t.exports=o.createClass({displayName:"SearchResultsTable",getComponentItem:function(t){return new s({key:t.name,component:t})},getSearchResults:function(){return this.props.results.map(this.getComponentItem)},sortByName:function(t){this.sortBy(t,"name")},sortByAuthor:function(t){this.sortBy(t,"author")},sortByStars:function(t){this.sortBy(t,"stars")},sortByUpdated:function(t){this.sortBy(t,"modified")},sortBy:function(t,e){t.preventDefault(),this.props.onSortClicked(e)},render:function(){return o.DOM.table({className:"pure-table pure-table-horizontal results-table"},o.DOM.thead(null,o.DOM.tr(null,o.DOM.th({className:"name"},o.DOM.a({href:"#",tabIndex:"-1",onClick:this.sortByName},"Name")),o.DOM.th({className:"author"},o.DOM.a({href:"#",tabIndex:"-1",onClick:this.sortByAuthor},"Author")),o.DOM.th({className:"stars"},o.DOM.a({href:"#",tabIndex:"-1",onClick:this.sortByStars},"Stars")),o.DOM.th({className:"updated"},o.DOM.a({href:"#",tabIndex:"-1",onClick:this.sortByUpdated},"Updated")))),o.DOM.tbody(null,this.props.results.length?this.getSearchResults():r(null)))}})},71:function(t,e,n){"use strict";var o=n(37),s=n(143);t.exports=o.createClass({displayName:"LatestComponents",propTypes:{components:o.PropTypes.array.isRequired,listName:o.PropTypes.string.isRequired,className:o.PropTypes.string},getDefaultProps:function(){return{className:"component-list"}},getComponentItem:function(t){return new s({key:t.name,component:t})},render:function(){return o.DOM.section({className:this.props.className},o.DOM.h2(null,this.props.listName),o.DOM.ul(null,this.props.components.map(this.getComponentItem)))}})},72:function(t,e,n){"use strict";var o=n(37);t.exports=o.createClass({displayName:"Loader",render:function(){return o.DOM.div({className:"loader"},o.DOM.div({className:"dot"}),o.DOM.div({className:"dot"}),o.DOM.div({className:"dot"}),o.DOM.div({className:"dot"}),o.DOM.div({className:"dot"}))}})},73:function(t,e,n){"use strict";var o="undefined"!=typeof window,s=o&&(navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/BlackBerry/i)||navigator.userAgent.match(/Windows Phone/i)),r=n(2),a=n(37),i=n(7),c=n(136),u=n(74),p="undefined"==typeof window?function(){}:window.CodeMirror,l={lineNumbers:!1,lineWrapping:!0,smartIndent:!1,matchBrackets:!0,theme:"solarized-light",readOnly:!0};t.exports=a.createClass({displayName:"MarkdownReadme",componentDidMount:function(){if(!s)for(var t,e,n=this.getDOMNode().querySelectorAll("pre > code"),o=0;o<n.length;o++)t=n[o].parentNode,e=n[o].getAttribute("class")||"",e=e.replace(/.*?lang\-(.*)/,"$1").split(/\s+/)[0],p(function(e){t.parentNode.replaceChild(e,t)},r.merge({value:n[o].innerText.trim(),mode:c["codemirror-modes"][e]||"javascript"},l))},fixRelativeUrls:function(t){for(var e,n,o="/blob/"+this.props.component.branch,s=this.getGithubUrl()+o,r=/<a href="(.*?)"/g;e=r.exec(t);)n=e[1],n.match(/^https?:\/\//)||(n=0===n.indexOf("/")?n:"/"+n,t=t.replace(new RegExp('<a href="'+e[1]+'">',"g"),'<a href="'+s+n+'">'));return t},getGithubUrl:function(){var t=u(this.props.component);return t?"https://github.com/"+t:!1},render:function(){var t=this.fixRelativeUrls(i(this.props.component.readme));return a.DOM.section({className:"readme",dangerouslySetInnerHTML:{__html:t}})}})},74:function(t){"use strict";var e=/github\.com[\/:](.*?\/.*?)(\?|\/|\.git$)/i;t.exports=function(t){for(var n,o=(t.repository||{}).url,s=t.homepage,r=(t.bugs||{}).url,a=[o,s,r].filter(Boolean),i=a.length;i--;)if(n=a[i].match(e),n[1])return n[1];return!1}},75:function(t){"use strict";var e=/\B(?=(?:\d{3})+(?!\d))/g;t.exports=function(t){return 1e3>t?t:1e4>t?(t+"").replace(e," "):1e6>t?Math.floor(t/1e3)+"K":(t/1e6).toFixed(1)+"M"}},136:function(t,e){(function(e){t.exports={"page-title":"React Components","npm-keyword":"react-component","poll-interval":3e5,"exclude-keywords":["react","react-component"],"codemirror-modes":{cs:"coffeescript",coffeescript:"coffeescript",coffee:"coffeescript",css:"css",html:"htmlmixed",javascript:"javscript",js:"javascript",php:"php",ruby:"ruby",rb:"rb",shell:"shell",sh:"shell",bash:"shell",batch:"shell",yaml:"yaml"},github:{type:"oauth",key:{NODE_ENV:"production"}.GITHUB_KEY,secret:{NODE_ENV:"production"}.GITHUB_SECRET},cache:{starCounts:e+"/../data/starCounts.json"}}}).call(e,"/")},137:function(t,e,n){"use strict";var o=n(37);t.exports=o.createClass({displayName:"Footer",render:function(){return o.DOM.footer(null,"Made by ",o.DOM.a({href:"http://vaffel.ninja/"},"VaffelNinja AS"),". ",o.DOM.a({href:"https://github.com/vaffel/react-components"},"Open-source"),".")}})},138:function(t,e,n){"use strict";var o=n(37);t.exports=o.createClass({displayName:"Container",render:function(){return this.transferPropsTo(o.DOM.div({className:"container"},this.props.children))}})},139:function(t,e,n){"use strict";var o=n(2),s=n(37);t.exports=s.createClass({displayName:"ReactLogo",render:function(){var t=["react-logo"].concat(this.props.className);return s.DOM.a({href:"/"},s.DOM.img(o.merge({},this.props,{src:"/img/react.svg",className:t.join(" ")})))}})},140:function(t,e,n){"use strict";var o=n(37),s=n(136),r=n(13);t.exports=o.createClass({displayName:"SearchInput",propTypes:{autoFocus:o.PropTypes.bool,placeholder:o.PropTypes.string,query:o.PropTypes.string},getDefaultProps:function(){return{autoFocus:!0,placeholder:"Component name, keyword or similar",query:""}},getInitialState:function(){return{query:this.props.query}},componentDidMount:function(){this.getDOMNode().setAttribute("results",5),this.props.query&&this.props.autoFocus&&this.moveCaretToEnd()},getPageTitle:function(t){return(t?t+" - ":"")+s["page-title"]},moveCaretToEnd:function(){var t=this.getDOMNode();if("number"==typeof t.selectionStart)t.selectionStart=t.selectionEnd=t.value.length;else if("undefined"!=typeof t.createTextRange){t.focus();var e=t.createTextRange();e.collapse(!1),e.select()}},onQueryChange:function(t){var e={query:t.target.value},n=e.query?"/search/"+encodeURIComponent(e.query):"/",o=this.getPageTitle(e.query);this.state.query?history.replaceState(e,o,n):history.pushState(e,o,n),r.locationChanged(),window.document.title=o,this.setState(e)},render:function(){return o.DOM.input({type:"search",className:"search",onChange:this.onQueryChange,defaultValue:this.props.query,value:this.state.query,placeholder:this.props.placeholder,autoFocus:this.props.autoFocus})}})},141:function(t,e,n){"use strict";var o=n(37),s=n(184);t.exports=o.createClass({displayName:"SearchResultItem",render:function(){return o.DOM.tr(null,o.DOM.td(null,s({component:this.props.component}),o.DOM.p({className:"description"},this.props.component.description)),o.DOM.td(null,this.props.component.author),o.DOM.td(null,this.props.component.stars||0),o.DOM.td(null,this.props.component.modified.fromNow()))}})},142:function(t,e,n){"use strict";var o=n(37);t.exports=o.createClass({displayName:"NoResult",render:function(){return o.DOM.tr(null,o.DOM.td({colSpan:"4",className:"no-result"},"Your search did not return any results, unfortunately."))}})},143:function(t,e,n){"use strict";var o=n(37),s=n(184);t.exports=o.createClass({displayName:"ComponentItem",propTypes:{component:o.PropTypes.object.isRequired},render:function(){return o.DOM.li(null,s({component:this.props.component}))}})},184:function(t,e,n){"use strict";var o=n(37),s=n(136),r=n(13);t.exports=o.createClass({displayName:"ComponentLink",getUrl:function(){return"/component/"+encodeURIComponent(this.props.component.name)},onClick:function(t){if(!(t.altKey||t.ctrlKey||t.metaKey||t.shiftKey||2===t.button)){t.preventDefault();var e=this.props.component.name+" - "+s["page-title"];history.pushState({},e,t.target.href),r.locationChanged()}},render:function(){return o.DOM.a({className:"component-name",href:this.getUrl(),onClick:this.onClick},this.props.children||this.props.component.name)}})}});