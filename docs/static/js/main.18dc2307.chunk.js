(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{88:function(e,n,r){},89:function(e,n,r){"use strict";r.r(n);var t=r(1),a=(r(0),r(16)),c=r.n(a),u=r(3),o=r(11),i=r(41),l=r(2),s=function(e,n){return n.playerNames.map((function(n){return m(e,n)}))},m=function(e,n){return e.find((function(e){return e.name===n}))},d=function(e){return e.players[e.currentTurnPlayerIndex]},f=function(e){var n=d(e);return n?n.name:null},y=function(e,n){return f(e)===n.name},p=function(e,n){return e.rooms.find((function(e){return j(e,n)}))},j=function(e,n){return e.playerNames.includes(n.name)},b=function(e,n){var r=d(e);return r&&!function(e,n){var r=d(e);if(r){var t=p(e,r);return t&&t.name===n.name}return!1}(e,n)&&!e.gameOver&&!e.emergencyMeetingStarted&&r.human},h=function(e,n){return e.imposterPlayerName===n.name},v=function(e){var n=e.currentTurnPlayerIndex+1;return e.players.length===n?0:n},O=r(9),g=r(42),x=function e(n){return function(r){return function(t){if(!(n>0))return t;var a=r(t);e(n-1)(r)(a)}}},P={clone:function(e){return Object(O.a)(e)},allExcept:function(e,n){return e.filter((function(e){return e!==n}))},pluckRandom:function(e){return 0===e.length?null:e.splice(P.sampleIndex(e),1)[0]},sampleIndex:function(e){return Math.floor(Math.random()*e.length)},sample:function(e){return e[P.sampleIndex(e)]}},N=function(e){for(var n=arguments.length,r=new Array(n>1?n-1:0),t=1;t<n;t++)r[t-1]=arguments[t];return r.reduce((function(e,n){return n(e)}),e)},C=function(e){return function(n,r){return Object(g.a)(n,(function(n){return e(n,r)}))}},T=function(e){return{type:"updatePlayerName",name:e}},R=function(){return function(e,n){var r=n();null!=m(r.players,r.addPlayerForm.name)?alert("There's already a player named ".concat(r.addPlayerForm.name)):e({type:"addHumanPlayer",player:{human:!0}})}},k=function(){return{type:"addComputerPlayer",player:{human:!1}}},I=function(){return function(e,n){e({type:"startGame"}),w(e,n)}},S=function(e){return function(n,r){n({type:"onRoomSelected",roomName:e}),w(n,r)}},w=function(e,n){e({type:"nextPlayerTurn"});var r=n();!d(r).human&&r.computerPlayersEnabled&&F(e,n)},F=function(e,n){setTimeout((function(){var r=P.sample(M(n));e(r)}),200)},M=function(e){return E},E=[function(e,n){var r=n(),t=P.sample(r.rooms);e(S(t.name))}],H=r(43),A=r(44),B=new(function(){function e(){Object(H.a)(this,e),this.actionsToReducers={},this.initialState={}}return Object(A.a)(e,[{key:"map",value:function(e,n){var r="function"===typeof e?e.name:e;this.actionsToReducers[r]||(this.actionsToReducers[r]=[]);var t=this.actionsToReducers[r];t[t.length]=n}},{key:"reduce",value:function(e,n){return this.getReducersForAction(n).reduce((function(e,r){return r(e,n)}),e)}},{key:"getReducersForAction",value:function(e){var n=e.type,r=this.actionsToReducers[n];return r||(console.log("No reducer found for ".concat(n)),[])}}]),e}()),D=function(e,n){B.map(e,n)};var G=function(e){},L=function(e){var n,r=[].concat(Object(O.a)(e.characters),Object(O.a)(e.weapons),Object(O.a)(e.rooms)),t=e.players.length;(n=r.length,function(e){return x(n)((function(n){return e(n),n+1}))(0)})((function(n){var a=n%t,c=e.players[a],u=Object(l.a)({id:n},P.pluckRandom(r));c.cards=[].concat(Object(O.a)(c.cards),[u])}))},J=function(e){e.whoDunnit={character:P.sample(e.characters),weapon:P.sample(e.weapons),room:P.sample(e.rooms)}},K=function(e,n,r){W(e,n.name);var t=function(e,n){return e.rooms.find((function(e){return e.name===n}))}(e,r);t.playerNames[t.playerNames.length]=n.name},W=function(e,n){e.rooms.forEach((function(e){e.playerNames=P.allExcept(e.playerNames,n)}))},U=function(e,n){return N(e,C((function(e){return function(e,n){var r=function(e,n){var r=function(e){return e.map((function(e){return e.character.name}))}(n);return e.filter((function(e){return!r.includes(e.name)}))}(e.characters,e.players);if(0==r.size)return alert("No more characters available!"),e;var t=P.sample(r),a=e.players.length,c=Object(l.a)(Object(l.a)({},n.player),{},{id:a,name:e.addPlayerForm.name||t.name,character:t,image:t.image,cards:[]});e.players[e.players.length]=c,K(e,c,"Hall"),e.addPlayerForm.name=""}(e,n)})))};D("init",(function(e){return e})),D("startGame",(function(e){return N(e,(function(e){return Object(l.a)(Object(l.a)({},e),{},{gameOver:!1,victory:!1})}),_,C(J),C(L),C(G))})),D("enableComputerPlayers",(function(e){return Object(l.a)(Object(l.a)({},e),{},{computerPlayersEnabled:!0})})),D("updatePlayerName",(function(e,n){return Object(l.a)(Object(l.a)({},e),{},{addPlayerForm:{name:n.name}})})),D("addHumanPlayer",U),D("addComputerPlayer",U),D("onRoomSelected",(function(e,n){return N(e,C((function(e){return function(e,n){var r=d(e);r&&K(e,r,n)}(e,n.roomName)})))})),D("nextPlayerTurn",(function(e){return N(e,(function(e){return Object(l.a)(Object(l.a)({},e),{},{currentTurnPlayerIndex:v(e)})}),z)}));var _=function(e){return Object(l.a)(Object(l.a)({},e),{},{currentTurnPlayerIndex:-1})},z=function(e){return Object(l.a)(Object(l.a)({},e),{},{notify:{message:"".concat(f(e),"'s turn!"),className:"turn"}})},q=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:B.initialState,n=arguments.length>1?arguments[1]:void 0;return B.reduce(e,n)},Q=r(45),V=r(46),X=r.n(V),Y=r(47),Z=r.n(Y)()("http://localhost:3000"),$=X()(Z,"server/"),ee=Object(o.applyMiddleware)(i.a,$),ne=Object(o.createStore)(q,{gameOver:!1,notify:{message:null},computerPlayersEnabled:!1,currentTurnPlayerIndex:-1,emergencyMeetingStarted:!1,emergencyMeetingInitiatedByPlayerIndex:null,voteTalliesByPlayer:{},computerPlayers:[],addPlayerForm:{name:""},players:[],whoDunnit:null,characters:[{name:"Miss Scarlett",image:"pink"},{name:"Mr. Green",image:"green"},{name:"Colonel Mustard",image:"orange"},{name:"Professor Plum",image:"blue"},{name:"Mrs. Peacock",image:"lightblue"},{name:"Mrs. White",image:"white"}],weapons:[{name:"Candlestick"},{name:"Dagger"},{name:"Lead Pipe"},{name:"Revolver"},{name:"Rope"},{name:"Wrench"}],rooms:[{name:"Kitchen",playerNames:[],emergencyButton:!0},{name:"Ballroom",playerNames:[]},{name:"Conservatory",playerNames:[]},{name:"Billiard Room",playerNames:[]},{name:"Library",playerNames:[]},{name:"Study",playerNames:[]},{name:"Hall",playerNames:[]},{name:"Lounge",playerNames:[]},{name:"Dining Room",playerNames:[]}]},Object(Q.composeWithDevTools)(ee));ne.dispatch({type:"init"});var re=ne,te=(r(88),Object(u.b)((function(e){return{notify:e.notify}}))((function(e){var n=e.notify;return null==n.message?"<div/>":Object(t.jsx)("div",{id:"notify",className:n.className,children:n.message})}))),ae=Object(u.b)((function(e){return{addPlayerForm:e.addPlayerForm}}),{updatePlayerName:T,addHumanPlayer:R,addComputerPlayer:k,startGame:I})((function(e){var n=e.addPlayerForm,r=e.updatePlayerName,a=e.addHumanPlayer,c=e.addComputerPlayer,u=e.startGame;return Object(t.jsxs)("div",{className:"header",children:[Object(t.jsx)("div",{className:"title",children:"CLUE"}),Object(t.jsxs)("div",{className:"gameControls",children:[Object(t.jsxs)("div",{className:"addPlayer",children:[Object(t.jsx)("input",{id:"playerName",placeholder:"Player Name",value:n.name,onKeyUp:function(e){"Enter"===e.code&&a()},onChange:function(e){r(e.target.value)}}),Object(t.jsx)("button",{id:"addHumanPlayer",onClick:function(){return a()},children:"Add Human Player"}),Object(t.jsx)("button",{id:"addComputerPlayer",onClick:function(){return c()},children:"Add Computer Player"})]}),"|",Object(t.jsx)("button",{id:"startButton",onClick:function(){return u()},children:"Start!"})]}),Object(t.jsx)(te,{})]})})),ce=function(e,n,r){return e&&r?"playerEjected":n||r?"turnHighlight":""},ue=Object(u.b)((function(e,n){return Object(l.a)(Object(l.a)({},n),{},{celebrate:e.gameOver,isCurrentTurn:y(e,n.player)})}),{})((function(e){var n=e.celebrate,r=e.player,a=e.isCurrentTurn;return Object(t.jsx)("div",{className:"player ".concat(ce(h,a,n)),children:Object(t.jsxs)("div",{children:[Object(t.jsx)("div",{className:"imageContainer",children:Object(t.jsx)("img",{src:"character-images/".concat(r.image,".png")})}),Object(t.jsxs)("div",{className:"playerContent",children:[Object(t.jsx)("span",{className:"playerName",children:r.name}),Object(t.jsx)("span",{className:"status",children:a?"'s turn!":""})]})]})})})),oe=Object(u.b)((function(e,n){return{room:n.room,players:e.players,currentTurnPlayerAbleToSelectRoom:b(e,n.room)}}),{onRoomSelected:S})((function(e){var n=e.room,r=e.players,a=e.currentTurnPlayerAbleToSelectRoom,c=e.onRoomSelected;return Object(t.jsxs)("div",{className:"room",onClick:function(){a&&c(n.name)},children:[Object(t.jsx)("div",{children:Object(t.jsx)("div",{className:"roomName",children:n.name})}),Object(t.jsx)("div",{className:"players",children:s(r,n).map((function(e){return Object(t.jsx)(ue,{player:e},e.name)}))})]})})),ie=Object(u.b)((function(e){return{rooms:e.rooms}}))((function(e){var n=e.rooms;return Object(t.jsx)("div",{children:n.map((function(e){return Object(t.jsx)(oe,{room:e},e.name)}))})})),le=Object(u.b)((function(e,n){return{card:n.card,player:n.player}}))((function(e){var n=e.card;e.player;return Object(t.jsx)("div",{className:"card",children:Object(t.jsx)("div",{children:n.name})})})),se=Object(u.b)((function(e,n){return{player:n.player}}))((function(e){var n=e.player;return Object(t.jsx)("div",{className:"cards",children:Object(t.jsx)("div",{children:n.cards.map((function(e){return Object(t.jsx)(le,{card:e},"card_".concat(e.id))}))})})})),me=Object(u.b)((function(e,n){return{player:e.players[e.currentTurnPlayerIndex]}}))((function(e){var n=e.player;return Object(t.jsx)("div",{className:"footer",children:Object(t.jsx)("div",{children:null!=n&&n.human?Object(t.jsx)(se,{player:n},"cards_".concat(n.id)):null})})}));var de=function(){return Object(t.jsxs)("div",{className:"App",children:[Object(t.jsx)(ae,{}),Object(t.jsx)(ie,{}),Object(t.jsx)(me,{})]})},fe=document.getElementById("root");c.a.render(Object(t.jsx)(u.a,{store:re,children:Object(t.jsx)(de,{})}),fe);var ye=[function(){return T("Jackson")},function(){return R()},function(){return T("Daddy")},function(){return R()},function(){return{type:"addComputerPlayer",player:{human:!1}}},function(){return{type:"addComputerPlayer",player:{human:!1}}},function(){return I()},function(){return{type:"enableComputerPlayers"}},function(){return S("Kitchen")},function(){return S("Library")}],pe=0,je=setInterval((function(){return console.log(ye[pe]),re.dispatch(ye[pe]()),void(++pe===ye.length&&clearInterval(je))}),100)}},[[89,1,2]]]);
//# sourceMappingURL=main.18dc2307.chunk.js.map