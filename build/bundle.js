!function(e,t){for(var n in t)e[n]=t[n]}(this,function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=function(){function e(t){i(this,e),this.upgradeCost=t,this.unitMultiplier=1,this.upgradeIncrementFactor=2}return r(e,[{key:"getMultiplier",value:function(){return this.unitMultiplier}},{key:"getUpgradeCost",value:function(){return this.upgradeCost}},{key:"upgrade",value:function(e){return e>=this.upgradeCost&&(e-=this.upgradeCost,this.upgradeCost*=this.upgradeIncrementFactor,this.unitMultiplier++),e}},{key:"save",value:function(){return JSON.stringify({upgradeCost:this.upgradeCost,unitMultiplier:this.unitMultiplier,upgradeIncrementFactor:this.upgradeIncrementFactor})}},{key:"load",value:function(e){e=JSON.parse(e),this.upgradeCost=e.upgradeCost,this.unitMultiplier=e.unitMultiplier,this.upgradeIncrementFactor=e.upgradeIncrementFactor}}]),e}(),u=function(e){function t(e,n){i(this,t);var r=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,n));return r.cost=e,r.costIncrementFactor=1.2,r.units=0,r}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o),r(t,[{key:"hire",value:function(e){return e>=this.cost&&(e-=this.cost,this.cost=Math.round(this.cost*this.costIncrementFactor),this.units++),e}},{key:"getCost",value:function(){return this.cost}},{key:"getUnits",value:function(){return this.units}},{key:"getMultiplier",value:function(){return Math.round(this.unitMultiplier*this.units)}},{key:"getUnitMultiplier",value:function(){return this.unitMultiplier}},{key:"save",value:function(){return JSON.stringify({upgradeCost:this.upgradeCost,unitMultiplier:this.unitMultiplier,upgradeIncrementFactor:this.upgradeIncrementFactor,cost:this.cost,costIncrementFactor:this.costIncrementFactor,units:this.units})}},{key:"load",value:function(e){e=JSON.parse(e),this.upgradeCost=e.upgradeCost,this.unitMultiplier=e.unitMultiplier,this.upgradeIncrementFactor=e.upgradeIncrementFactor,this.cost=e.cost,this.costIncrementFactor=e.costIncrementFactor,this.units=e.units}}]),t}();t.Multiplier=o,t.EntityMultiplier=u},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.startGame=f,t.advanceScene=function(){o<5&&(l=Math.pow(10,3+o))},t.restart=function(){f()};var r=n(0),i=200,o=void 0,u=void 0,a=void 0,s=void 0,c=void 0,l=void 0,d=new r.EntityMultiplier(10,19),p=new r.EntityMultiplier(10,19),m=new r.Multiplier(10),g=window.localStorage;function f(){0==g.length?newgame():(s=parseInt(g.getItem("potatoNum")),c=parseInt(g.getItem("funds")),l=parseInt(g.getItem("totalFunds")),d.load(g.getItem("farmhand")),p.load(g.getItem("salesman")),m.load(g.getItem("potato")),o=g.getItem("sceneNum"),console.log("game loaded"),u=performance.now(),h())}function h(){var e;(a=performance.now())-u>i&&(document.getElementById("potatoCounter").innerHTML="Potatoes: "+s,document.getElementById("moneyCounter").innerHTML="Money: "+c,document.getElementById("farmhandNumber").innerHTML="# Farmhands: "+d.getUnits(),document.getElementById("salesmanNumber").innerHTML="# Salesmen: "+p.getUnits(),document.getElementById("potatoUpgradeLevel").innerHTML="Potato level: "+m.getMultiplier(),document.getElementById("farmhandUpgradeLevel").innerHTML="Farmhand level: "+d.getUnitMultiplier(),document.getElementById("salesmanUpgradeLevel").innerHTML="Salesman level: "+p.getUnitMultiplier(),document.getElementById("potatoUpgrade").innerHTML="Upgrade Potato: "+m.getUpgradeCost(),document.getElementById("farmhandUpgrade").innerHTML="Train Farmhand: "+d.getUpgradeCost(),document.getElementById("salesmanUpgrade").innerHTML="Train Salesman: "+p.getUpgradeCost(),document.getElementById("farmhandHire").innerHTML="Hire Farmhand: "+d.getCost(),document.getElementById("salesmanHire").innerHTML="Hire Salesman: "+p.getCost(),document.getElementById("game-image").src="build/images/potato-producer-"+o+".svg",u=a,s+=m.getMultiplier()*d.getMultiplier(),e=p.getMultiplier(),c+=e,o=(l+=e)<=1e3?1:l<=1e4?2:l<=1e5?3:l<=1e6?4:5),window.requestAnimationFrame(h)}document.getElementById("producePotato").addEventListener("click",function(){s+=m.getMultiplier()}),document.getElementById("sellPotato").addEventListener("click",function(){s>0&&(s--,c++,l++)}),document.getElementById("farmhandHire").addEventListener("click",function(){c=d.hire(c)}),document.getElementById("salesmanHire").addEventListener("click",function(){c=p.hire(c)}),document.getElementById("potatoUpgrade").addEventListener("click",function(){c=m.upgrade(c)}),document.getElementById("farmhandUpgrade").addEventListener("click",function(){c=d.upgrade(c)}),document.getElementById("salesmanUpgrade").addEventListener("click",function(){c=p.upgrade(c)}),document.getElementById("save").addEventListener("click",function(){g.setItem("potatoNum",s),g.setItem("funds",c),g.setItem("totalFunds",l),g.setItem("farmhand",d.save()),g.setItem("salesman",p.save()),g.setItem("potato",m.save()),g.setItem("sceneNum",o),console.log("game saved")}),f()},function(e,t,n){e.exports=n(1)}]));