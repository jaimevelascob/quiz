(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c452c3f8"],{"0ec9":function(e,t,r){e.exports=r.p+"img/Logo.92b042ff.jpeg"},"13c9":function(e,t,r){"use strict";var n=r("4df3"),a=r.n(n);a.a},"14c3":function(e,t,r){var n=r("c6b6"),a=r("9263");e.exports=function(e,t){var r=e.exec;if("function"===typeof r){var o=r.call(e,t);if("object"!==typeof o)throw TypeError("RegExp exec method returned something other than an Object or null");return o}if("RegExp"!==n(e))throw TypeError("RegExp#exec called on incompatible receiver");return a.call(e,t)}},"1dde":function(e,t,r){var n=r("d039"),a=r("b622"),o=r("2d00"),s=a("species");e.exports=function(e){return o>=51||!n((function(){var t=[],r=t.constructor={};return r[s]=function(){return{foo:1}},1!==t[e](Boolean).foo}))}},"466d":function(e,t,r){"use strict";var n=r("d784"),a=r("825a"),o=r("50c4"),s=r("1d80"),i=r("8aa5"),c=r("14c3");n("match",1,(function(e,t,r){return[function(t){var r=s(this),n=void 0==t?void 0:t[e];return void 0!==n?n.call(t,r):new RegExp(t)[e](String(r))},function(e){var n=r(t,e,this);if(n.done)return n.value;var s=a(e),l=String(this);if(!s.global)return c(s,l);var u=s.unicode;s.lastIndex=0;var d,p=[],f=0;while(null!==(d=c(s,l))){var h=String(d[0]);p[f]=h,""===h&&(s.lastIndex=i(l,o(s.lastIndex),u)),f++}return 0===f?null:p}]}))},"4a33":function(e,t,r){},"4df3":function(e,t,r){},6547:function(e,t,r){var n=r("a691"),a=r("1d80"),o=function(e){return function(t,r){var o,s,i=String(a(t)),c=n(r),l=i.length;return c<0||c>=l?e?"":void 0:(o=i.charCodeAt(c),o<55296||o>56319||c+1===l||(s=i.charCodeAt(c+1))<56320||s>57343?e?i.charAt(c):o:e?i.slice(c,c+2):s-56320+(o-55296<<10)+65536)}};e.exports={codeAt:o(!1),charAt:o(!0)}},"6f40":function(e,t,r){"use strict";var n,a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"nav"},[n("img",{staticClass:"log",attrs:{src:r("0ec9"),alt:""}}),n("nav",{staticClass:"links"},[n("ul",[n("li",[n("router-link",{attrs:{to:"/CreateChallenge"}},[e._v("Crear reto")])],1),n("li",[n("router-link",{attrs:{to:"/challenges"}},[e._v("Lista De Retos")])],1),n("li",[n("router-link",{attrs:{id:"link",to:{name:"Profile",params:{id:this.userID}}}},[e._v("Mi perfil")])],1),n("li",[n("router-link",{attrs:{to:"/instrucciones"}},[e._v("Instrucciones")])],1),n("li",[n("router-link",{attrs:{to:"/about"}},[e._v("About")])],1)])]),n("div",{staticClass:"users"},[n("p",[e._v(e._s(e.nombreUsuario))]),n("button",{directives:[{name:"show",rawName:"v-show",value:e.nomodal,expression:"nomodal"}],staticClass:"myButton",attrs:{id:"link"},on:{click:function(t){return e.loginUser()}}},[e._v("Login")]),n("button",{directives:[{name:"show",rawName:"v-show",value:e.modal,expression:"modal"}],staticClass:"buttonP",attrs:{id:"link"},on:{click:function(t){return e.logoutUser()}}},[e._v("Logout")])])])])},o=[],s=r("ade3"),i=r("f62d"),c=(n={name:"MenuCustom",data:function(){return{nombreUsuario:"",modal:!0,nomodal:!0}},methods:{logoutUser:function(){Object(i["c"])(),this.$router.push("/")},loginUser:function(){this.$router.push("/")},getUserName:function(){this.nombreUsuario=localStorage.getItem("name"),localStorage.getItem("id")?(this.userID=localStorage.getItem("id"),this.modal=!0,this.nomodal=!1):(this.userID=0,this.modal=!1,this.nomodal=!0)}}},Object(s["a"])(n,"data",(function(){return{adminroutes:!1,nombreUsuario:"",userID:0}})),Object(s["a"])(n,"created",(function(){this.getUserName()})),n),l=c,u=(r("7c32"),r("2877")),d=Object(u["a"])(l,a,o,!1,null,"744fadac",null);t["a"]=d.exports},"7c32":function(e,t,r){"use strict";var n=r("b1ad"),a=r.n(n);a.a},8418:function(e,t,r){"use strict";var n=r("c04e"),a=r("9bf2"),o=r("5c6c");e.exports=function(e,t,r){var s=n(t);s in e?a.f(e,s,o(0,r)):e[s]=r}},"8aa5":function(e,t,r){"use strict";var n=r("6547").charAt;e.exports=function(e,t,r){return t+(r?n(e,t).length:1)}},9263:function(e,t,r){"use strict";var n=r("ad6d"),a=r("9f7f"),o=RegExp.prototype.exec,s=String.prototype.replace,i=o,c=function(){var e=/a/,t=/b*/g;return o.call(e,"a"),o.call(t,"a"),0!==e.lastIndex||0!==t.lastIndex}(),l=a.UNSUPPORTED_Y||a.BROKEN_CARET,u=void 0!==/()??/.exec("")[1],d=c||u||l;d&&(i=function(e){var t,r,a,i,d=this,p=l&&d.sticky,f=n.call(d),h=d.source,v=0,m=e;return p&&(f=f.replace("y",""),-1===f.indexOf("g")&&(f+="g"),m=String(e).slice(d.lastIndex),d.lastIndex>0&&(!d.multiline||d.multiline&&"\n"!==e[d.lastIndex-1])&&(h="(?: "+h+")",m=" "+m,v++),r=new RegExp("^(?:"+h+")",f)),u&&(r=new RegExp("^"+h+"$(?!\\s)",f)),c&&(t=d.lastIndex),a=o.call(p?r:d,m),p?a?(a.input=a.input.slice(v),a[0]=a[0].slice(v),a.index=d.lastIndex,d.lastIndex+=a[0].length):d.lastIndex=0:c&&a&&(d.lastIndex=d.global?a.index+a[0].length:t),u&&a&&a.length>1&&s.call(a[0],r,(function(){for(i=1;i<arguments.length-2;i++)void 0===arguments[i]&&(a[i]=void 0)})),a}),e.exports=i},"9f7f":function(e,t,r){"use strict";var n=r("d039");function a(e,t){return RegExp(e,t)}t.UNSUPPORTED_Y=n((function(){var e=a("a","y");return e.lastIndex=2,null!=e.exec("abcd")})),t.BROKEN_CARET=n((function(){var e=a("^r","gy");return e.lastIndex=2,null!=e.exec("str")}))},ac1f:function(e,t,r){"use strict";var n=r("23e7"),a=r("9263");n({target:"RegExp",proto:!0,forced:/./.exec!==a},{exec:a})},ad6d:function(e,t,r){"use strict";var n=r("825a");e.exports=function(){var e=n(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},ade3:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return n}))},ae40:function(e,t,r){var n=r("83ab"),a=r("d039"),o=r("5135"),s=Object.defineProperty,i={},c=function(e){throw e};e.exports=function(e,t){if(o(i,e))return i[e];t||(t={});var r=[][e],l=!!o(t,"ACCESSORS")&&t.ACCESSORS,u=o(t,0)?t[0]:c,d=o(t,1)?t[1]:void 0;return i[e]=!!r&&!a((function(){if(l&&!n)return!0;var e={length:-1};l?s(e,1,{enumerable:!0,get:c}):e[1]=1,r.call(e,u,d)}))}},b1ad:function(e,t,r){},c66d:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",[r("menucustom")],1),r("div",[r("ProfileComponent",{attrs:{profile:e.profile}})],1),r("div",[r("section",{directives:[{name:"show",rawName:"v-show",value:e.getIds(),expression:"getIds()"}]},[r("button",{on:{click:function(t){return e.openModal("pass")}}},[e._v("Cambiar Contraseña")]),r("button",{on:{click:function(t){return e.eliminar()}}},[e._v("Borrar Perfil")])])]),r("div",{directives:[{name:"show",rawName:"v-show",value:e.modalPass,expression:"modalPass"}],staticClass:"modal"},[r("div",{staticClass:"modalBox"},[r("p",{directives:[{name:"show",rawName:"v-show",value:e.required,expression:"required"}],staticClass:"color1"},[e._v("Tienes datos sin completar")]),r("p",{directives:[{name:"show",rawName:"v-show",value:e.match,expression:"match"}],staticClass:"color2"},[e._v("Las contraseñas no coinciden")]),r("p",[e._v("Contraseña antigua")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.old_user_password,expression:"old_user_password"}],attrs:{name:"oldpassword",required:"",type:"password",minlength:"6",maxlength:"100",placeholder:"antigua contraseña"},domProps:{value:e.old_user_password},on:{input:function(t){t.target.composing||(e.old_user_password=t.target.value)}}}),r("br"),r("p",[e._v("Contraseña Nueva")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{name:"password",required:"",type:"password",minlength:"6",maxlength:"100",placeholder:"nueva contraseña"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}}),r("p",[e._v("Repite la contraseña")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.password2,expression:"password2"}],attrs:{name:"password2",required:"",type:"password",minlength:"6",maxlength:"100",placeholder:"Repite la contraseña"},domProps:{value:e.password2},on:{input:function(t){t.target.composing||(e.password2=t.target.value)}}}),r("br"),r("button",{on:{click:function(t){return e.closeModal()}}},[e._v("Cancelar")]),r("button",{on:{click:function(t){return e.changePassword()}}},[e._v("Cambiar Contraseña")])])])])},a=[],o=(r("ac1f"),r("466d"),r("6f40")),s=r("f62d"),i=r("bc3a"),c=r.n(i),l=r("3d20"),u=r.n(l),d=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",{staticClass:"profile"},[r("div",{staticClass:"profi2"},[r("ul",{attrs:{id:"aw-gallery"}},[r("li",[r("p",{staticClass:"rol"},[e._v(e._s(e.profile.id?" 🐻‍ "+e.profile.id:null))])]),r("li",[r("p",[e._v(e._s(e.profile.nickName?e.profile.nickName:null))])]),r("li",[r("p",[e._v(e._s(e.profile.email?e.profile.email:null))])]),r("li",[r("p",[e._v(e._s(e.profile.registrationDate?"Miembro desde: "+e.profile.registrationDate.substr(0,10):null))])]),r("li",[r("p",[e._v(e._s(e.profile.role?e.profile.role:null))])])]),r("br")])])])},p=[],f=(r("fb6a"),{name:"ProfileComponent",data:function(){return{}},props:{profile:Object},methods:{capitalize:function(){return this.charAt(0).toUpperCase()+this.slice(1)}}}),h=f,v=(r("f231"),r("2877")),m=Object(v["a"])(h,d,p,!1,null,"07726fc4",null),g=m.exports,w={name:"Profile",components:{menucustom:o["a"],ProfileComponent:g},data:function(){return{old_user_password:"",password:"",password2:"",profile:{},answers:{},modalEdit:!1,modalPass:!1,email:"",role:"",correctData:!1,required:!1,match:!1}},methods:{validatingData:function(){""===this.old_user_password||""===this.password||""===this.password2?(this.correctData=!1,this.required=!0):this.password!=this.password2?this.match=!0:(this.correctData=!0,this.required=!1,this.match=!1)},logoutUser:function(){Object(s["c"])(),this.$router.push("/")},eliminar:function(){var e=this;u.a.fire({title:"Estas seguro de que quieres borrar tu perfil?",text:"Despues de hacerlo no podras volver atrás!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Si, borra mi perfil!"}).then((function(t){t.value&&(u.a.fire("Has borrado tu perfil!","Seras redirigido al Landing.","success"),e.deleteUser(),Object(s["c"])(),e.$router.push("/"))}))},deleteUser:function(){c.a.delete("http://localhost:3000/users/"+this.profile.id).then((function(e){console.log(e)})).catch((function(e){e.response&&alert(e.response.data.message)}))},changePassword:function(){if(this.validatingData(),1==this.correctData){var e=this;c.a.post("http://localhost:3000/users/".concat(e.profile.id,"/password"),{oldPassword:e.old_user_password,newPassword:e.password}).then((function(t){console.log(t),u.a.fire("Has cambiado tu contraseña!","Seras redirigido al Login.","success"),e.logoutUser()})).catch((function(e){e.response&&alert(e.response.data.message)}))}else console.log("No has rellenado todos los campos")},edite:function(){c.a.put("http://localhost:3000/users/"+this.profile.id,{email:this.email}).then((function(e){console.log(e),location.reload()})).catch((function(e){e.response&&alert(e.response.data.message)}))},closeModal:function(){this.modalEdit=!1,this.modalPass=!1,this.password="",this.password2="",this.required="",this.match=""},getIds:function(){return!0},saveDataToModal:function(){this.email=this.profile.email,this.role=this.profile.role},getProfile:function(){var e=this;c.a.get("http://localhost:3000/users/"+e.$route.params.id).then((function(t){e.profile=t.data.data})).catch((function(e){e.response&&alert(e.response.data.message)}))},getAnswers:function(){var e=this;c.a.get("http://localhost:3000/answers/"+e.$route.params.id).then((function(t){e.answers=t.data.data})).catch((function(e){e.response&&alert(e.response.data.message)}))},openModal:function(e){"edit"===e?(this.saveDataToModal(),this.modalEdit=!0):this.modalPass=!0}},created:function(){this.getProfile()}},x=w,b=(r("13c9"),Object(v["a"])(x,n,a,!1,null,"065d209c",null));t["default"]=b.exports},d784:function(e,t,r){"use strict";r("ac1f");var n=r("6eeb"),a=r("d039"),o=r("b622"),s=r("9263"),i=r("9112"),c=o("species"),l=!a((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")})),u=function(){return"$0"==="a".replace(/./,"$0")}(),d=o("replace"),p=function(){return!!/./[d]&&""===/./[d]("a","$0")}(),f=!a((function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var r="ab".split(e);return 2!==r.length||"a"!==r[0]||"b"!==r[1]}));e.exports=function(e,t,r,d){var h=o(e),v=!a((function(){var t={};return t[h]=function(){return 7},7!=""[e](t)})),m=v&&!a((function(){var t=!1,r=/a/;return"split"===e&&(r={},r.constructor={},r.constructor[c]=function(){return r},r.flags="",r[h]=/./[h]),r.exec=function(){return t=!0,null},r[h](""),!t}));if(!v||!m||"replace"===e&&(!l||!u||p)||"split"===e&&!f){var g=/./[h],w=r(h,""[e],(function(e,t,r,n,a){return t.exec===s?v&&!a?{done:!0,value:g.call(t,r,n)}:{done:!0,value:e.call(r,t,n)}:{done:!1}}),{REPLACE_KEEPS_$0:u,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:p}),x=w[0],b=w[1];n(String.prototype,e,x),n(RegExp.prototype,h,2==t?function(e,t){return b.call(e,this,t)}:function(e){return b.call(e,this)})}d&&i(RegExp.prototype[h],"sham",!0)}},e8b5:function(e,t,r){var n=r("c6b6");e.exports=Array.isArray||function(e){return"Array"==n(e)}},f231:function(e,t,r){"use strict";var n=r("4a33"),a=r.n(n);a.a},fb6a:function(e,t,r){"use strict";var n=r("23e7"),a=r("861d"),o=r("e8b5"),s=r("23cb"),i=r("50c4"),c=r("fc6a"),l=r("8418"),u=r("b622"),d=r("1dde"),p=r("ae40"),f=d("slice"),h=p("slice",{ACCESSORS:!0,0:0,1:2}),v=u("species"),m=[].slice,g=Math.max;n({target:"Array",proto:!0,forced:!f||!h},{slice:function(e,t){var r,n,u,d=c(this),p=i(d.length),f=s(e,p),h=s(void 0===t?p:t,p);if(o(d)&&(r=d.constructor,"function"!=typeof r||r!==Array&&!o(r.prototype)?a(r)&&(r=r[v],null===r&&(r=void 0)):r=void 0,r===Array||void 0===r))return m.call(d,f,h);for(n=new(void 0===r?Array:r)(g(h-f,0)),u=0;f<h;f++,u++)f in d&&l(n,u,d[f]);return n.length=u,n}})}}]);
//# sourceMappingURL=chunk-c452c3f8.cac2d1d3.js.map