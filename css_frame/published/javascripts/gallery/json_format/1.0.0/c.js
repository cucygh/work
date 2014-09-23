/*! application-name 2014-09-23 */
function $id(a){return document.getElementById(a)}function IsArray(a){return a&&"object"==typeof a&&"number"==typeof a.length&&!a.propertyIsEnumerable("length")}function Process(){SetTab(),window.IsCollapsible=!0;var json=$id("res-param").value,html="";try{""==json&&(json='""');var obj=eval("["+json+"]");html=ProcessObject(obj[0],0,!1,!1,!1),$id("json-formated").innerHTML="<h4>服务器响应格式化：</h4><PRE class='CodeContainer'>"+html+"</PRE>"}catch(e){alert("JSON数据格式不正确:\n"+e.message),$id("json-formated").innerHTML=""}}function ProcessObject(a,b,c,d,e){var f="",g=c?"<span class='Comma'>,</span> ":"",h=typeof a,i="";if(IsArray(a))if(0==a.length)f+=GetRow(b,"<span class='ArrayBrace'>[ ]</span>"+g,e);else{i=window.IsCollapsible?'<span><img src="'+window.ImgExpanded+'" onClick="ExpImgClicked(this)" /></span><span class=\'collapsible\'>':"",f+=GetRow(b,"<span class='ArrayBrace'>[</span>"+i,e);for(var j=0;j<a.length;j++)f+=ProcessObject(a[j],b+1,j<a.length-1,!0,!1);i=window.IsCollapsible?"</span>":"",f+=GetRow(b,i+"<span class='ArrayBrace'>]</span>"+g)}else if("object"==h)if(null==a)f+=FormatLiteral("null","",g,b,d,"Null");else if(a.constructor==window._dateObj.constructor)f+=FormatLiteral("new Date("+a.getTime()+") /*"+a.toLocaleString()+"*/","",g,b,d,"Date");else if(a.constructor==window._regexpObj.constructor)f+=FormatLiteral("new RegExp("+a+")","",g,b,d,"RegExp");else{var k=0;for(var l in a)k++;if(0==k)f+=GetRow(b,"<span class='ObjectBrace'>{ }</span>"+g,e);else{i=window.IsCollapsible?'<span><img src="'+window.ImgExpanded+'" onClick="ExpImgClicked(this)" /></span><span class=\'collapsible\'>':"",f+=GetRow(b,"<span class='ObjectBrace'>{</span>"+i,e);var m=0;for(var l in a){var n=window.QuoteKeys?'"':"";f+=GetRow(b+1,"<span class='PropertyName'>"+n+l+n+"</span>: "+ProcessObject(a[l],b+1,++m<k,!1,!0))}i=window.IsCollapsible?"</span>":"",f+=GetRow(b,i+"<span class='ObjectBrace'>}</span>"+g)}}else"number"==h?f+=FormatLiteral(a,"",g,b,d,"Number"):"boolean"==h?f+=FormatLiteral(a,"",g,b,d,"Boolean"):"function"==h?a.constructor==window._regexpObj.constructor?f+=FormatLiteral("new RegExp("+a+")","",g,b,d,"RegExp"):(a=FormatFunction(b,a),f+=FormatLiteral(a,"",g,b,d,"Function")):f+="undefined"==h?FormatLiteral("undefined","",g,b,d,"Null"):FormatLiteral(a.toString().split("\\").join("\\\\").split('"').join('\\"'),'"',g,b,d,"String");return f}function FormatLiteral(a,b,c,d,e,f){"string"==typeof a&&(a=a.split("<").join("&lt;").split(">").join("&gt;"));var g="<span class='"+f+"'>"+b+a+b+c+"</span>";return e&&(g=GetRow(d,g)),g}function FormatFunction(a,b){for(var c="",d=0;a>d;d++)c+=window.TAB;for(var e=b.toString().split("\n"),f="",d=0;d<e.length;d++)f+=(0==d?"":c)+e[d]+"\n";return f}function GetRow(a,b,c){for(var d="",e=0;a>e&&!c;e++)d+=window.TAB;return null!=b&&b.length>0&&"\n"!=b.charAt(b.length-1)&&(b+="\n"),d+b}function CollapsibleViewClicked(){$id("CollapsibleViewDetail").style.visibility=$id("CollapsibleView").checked?"visible":"hidden",Process()}function QuoteKeysClicked(){window.QuoteKeys=$id("QuoteKeys").checked,Process()}function CollapseAllClicked(){EnsureIsPopulated(),TraverseChildren($id("json-formated"),function(a){"collapsible"==a.className&&MakeContentVisible(a,!1)},0)}function ExpandAllClicked(){EnsureIsPopulated(),TraverseChildren($id("json-formated"),function(a){"collapsible"==a.className&&MakeContentVisible(a,!0)},0)}function MakeContentVisible(a,b){var c=a.previousSibling.firstChild;c.tagName&&"img"==c.tagName.toLowerCase()&&(a.style.display=b?"inline":"none",a.previousSibling.firstChild.src=b?window.ImgExpanded:window.ImgCollapsed)}function TraverseChildren(a,b,c){for(var d=0;d<a.childNodes.length;d++)TraverseChildren(a.childNodes[d],b,c+1);b(a,c)}function ExpImgClicked(a){var b=a.parentNode.nextSibling;if(b){var c="none",d=window.ImgCollapsed;"none"==b.style.display&&(c="inline",d=window.ImgExpanded),b.style.display=c,a.src=d}}function CollapseLevel(a){EnsureIsPopulated(),TraverseChildren($id("json-formated"),function(b,c){"collapsible"==b.className&&(c>=a?MakeContentVisible(b,!1):MakeContentVisible(b,!0))},0)}function TabSizeChanged(){Process()}function SetTab(){window.TAB=MultiplyString(parseInt(2),window.SINGLE_TAB)}function EnsureIsPopulated(){!$id("json-formated").innerHTML&&$id("res-param").value&&Process()}function MultiplyString(a,b){for(var c=[],d=0;a>d;d++)c.push(b);return c.join("")}function SelectAllClicked(){if(document.selection&&document.selection.empty)document.selection.empty();else if(window.getSelection){var a=window.getSelection();a.removeAllRanges&&window.getSelection().removeAllRanges()}var b=document.body&&document.body.createTextRange?document.body.createTextRange():document.createRange();b.selectNode?b.selectNode($id("json-formated")):b.moveToElementText&&b.moveToElementText($id("json-formated")),b.select?b.select($id("json-formated")):window.getSelection().addRange(b)}function LinkToJson(){var a=$id("res-param").value;a=escape(a.split("/n").join(" ").split("/r").join(" ")),$id("InvisibleLinkUrl").value=a,$id("InvisibleLink").submit()}window.SINGLE_TAB="  ",window.ImgCollapsed="images/Collapsed.gif",window.ImgExpanded="images/Expanded.gif",window.QuoteKeys=!0,window._dateObj=new Date,window._regexpObj=new RegExp;