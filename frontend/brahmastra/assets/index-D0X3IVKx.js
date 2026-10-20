(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();const Ls={name:"Brahmastra AI",subtitle:"NEURAL INTELLIGENCE CORE",build:"v1.0.0 / NX-7"},ve={cyan:3142655,cyanDim:884626,iceBlue:9427199,white:15400959,amber:16757568,gold:16765040,goldDeep:16747038,background:517},xl={cyan:"#2ff3ff",cyanDim:"rgba(47, 243, 255, 0.35)"},ns={HIGH:{particles:2e4,connections:8e3,motes:1400,bloomStrength:.62,bloomRadius:.42,pixelRatioCap:2,grain:!0,chromaticAberration:!0},MEDIUM:{particles:1e4,connections:4e3,motes:800,bloomStrength:.58,bloomRadius:.4,pixelRatioCap:1.5,grain:!0,chromaticAberration:!0},LOW:{particles:5e3,connections:2e3,motes:400,bloomStrength:.5,bloomRadius:.38,pixelRatioCap:1,grain:!1,chromaticAberration:!1}},_l=["LOW","MEDIUM","HIGH"],Yi={sampleWindow:90,downgradeBelowFps:45,upgradeAboveFps:58,cooldownSeconds:6,upgradeDwellSeconds:10},ti={fov:42,near:.1,far:200,cameraDistance:6.6,parallax:.55,ambientIntensity:.14,coreLightIntensity:3,rimLightIntensity:1.1},We={radius:1.55,innerRadius:.55,connectionRadius:.115,maxNeighboursPerNode:3,clusterCount:26,noiseAmplitude:.055,idleSpin:.055,handInfluenceRadius:.85,handAttraction:.22,handRepulsionRadius:.16,handRepulsion:.1,minScale:.62,maxScale:1.85,scaleDamping:3.2,pinchRotationGain:3.1,rotationFriction:.94,contractDamping:5,burstDuration:1.6,burstDistance:2.4,modeBlendSeconds:1.1,formationSeconds:3.2},vn={slots:4,speed:1.15,width:.13,decay:.75,idleInterval:3.4},en={scanSpeedIdle:.35,scanSpeedActive:1.35},Ct={wasmBasePath:"https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm",modelAssetPath:"https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",numHands:2,minHandDetectionConfidence:.55,minHandPresenceConfidence:.55,minTrackingConfidence:.55,targetInferenceFps:30,video:{width:640,height:480,frameRate:30},lostFrames:8},Qr={minCutoff:1.1,beta:.012,derivativeCutoff:1},Zt={WORLD_WIDTH:7.6,WORLD_HEIGHT:4.6,DEPTH_SCALE:6.5,DEPTH_OFFSET:.35,SMOOTHING_FACTOR:12},Tt={pinchEnter:.34,pinchExit:.46,fingerExtendEnter:.62,fingerExtendExit:.48,fistMaxOpenness:.42,openPalmMinOpenness:.72,debounceSeconds:.12,confidenceThreshold:.4,swipeMinVelocity:1.45,swipeMinDistance:.22,swipeMaxDuration:.45,swipeCooldown:.8,twoHandMinSeparation:.18,twoHandMaxSeparation:1.25,motionDeadZone:.0035},Ga={legendVisibleSeconds:22,toastSeconds:1.6,readoutDamping:3},wr={masterGain:.16,enabledByDefault:!0},An={reducedMotion:"brahmastra.reducedMotion",highContrast:"brahmastra.highContrast",audio:"brahmastra.audio"};function Fh(){const s=document.createElement("canvas");let e=null,t=0;const i=s.getContext("webgl2"),n=i??s.getContext("webgl");if(n){t=n.getParameter(n.MAX_TEXTURE_SIZE);const r=n.getExtension("WEBGL_debug_renderer_info");if(r){const o=n.getParameter(r.UNMASKED_RENDERER_WEBGL);e=typeof o=="string"?o:null}n.getExtension("WEBGL_lose_context")?.loseContext()}return{gl2:i!==null,gl1:n!==null,maxTextureSize:t,renderer:e}}function zc(){const s=Fh(),e=window.matchMedia?.("(pointer: coarse)").matches??!1,t=window.matchMedia?.("(max-width: 900px)").matches??!1,i=/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent),n=e&&(t||i),r=navigator.hardwareConcurrency??4,a=navigator.deviceMemory??null,o=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1;let c="HIGH";return n?c="LOW":(!s.gl2||r<=4||a!==null&&a<=4)&&(c="MEDIUM"),s.renderer&&/SwiftShader|llvmpipe|Software|Basic Render/i.test(s.renderer)&&(c="LOW"),{webgl2:s.gl2,webgl:s.gl1,mobile:n,coarsePointer:e,hardwareConcurrency:r,deviceMemoryGb:a,maxTextureSize:s.maxTextureSize,prefersReducedMotion:o,suggestedTier:c,renderer:s.renderer}}class Bh{constructor(e,t=!0){this.tier=e,this.adaptive=t}samples=[];sampleIndex=0;cooldown=0;goodStreak=0;listeners=[];frameCount=0;fpsAccumulator=0;displayFps=0;inferenceTimestamps=[];get quality(){return this.tier}get fps(){return this.displayFps}get frameTimeMs(){return this.displayFps>0?1e3/this.displayFps:0}get inferenceFps(){return this.inferenceTimestamps.length}onQualityChange(e){this.listeners.push(e)}markInference(e){this.inferenceTimestamps.push(e);const t=e-1e3;for(;this.inferenceTimestamps.length>0&&this.inferenceTimestamps[0]<t;)this.inferenceTimestamps.shift()}update(e){if(e<=0)return;const t=1/e;if(this.samples.length<Yi.sampleWindow?this.samples.push(t):(this.samples[this.sampleIndex]=t,this.sampleIndex=(this.sampleIndex+1)%Yi.sampleWindow),this.frameCount++,this.fpsAccumulator+=e,this.fpsAccumulator>=.25&&(this.displayFps=this.frameCount/this.fpsAccumulator,this.frameCount=0,this.fpsAccumulator=0),!this.adaptive||(this.cooldown=Math.max(0,this.cooldown-e),this.samples.length<Yi.sampleWindow||this.cooldown>0))return;const i=this.average();if(i<Yi.downgradeBelowFps){this.goodStreak=0,this.shift(-1,"downgrade");return}i>Yi.upgradeAboveFps?(this.goodStreak+=e,this.goodStreak>=Yi.upgradeDwellSeconds&&(this.goodStreak=0,this.shift(1,"upgrade"))):this.goodStreak=0}average(){let e=0;for(let t=0;t<this.samples.length;t++)e+=this.samples[t];return e/this.samples.length}shift(e,t){const i=_l.indexOf(this.tier),n=_l[i+e];if(n){this.tier=n,this.cooldown=Yi.cooldownSeconds,this.samples.length=0,this.sampleIndex=0;for(const r of this.listeners)r(n,t)}}setTier(e){if(e!==this.tier){this.tier=e,this.cooldown=Yi.cooldownSeconds,this.samples.length=0;for(const t of this.listeners)t(e,"downgrade")}}}const Nt=Math.PI*2;function Oi(s,e,t){return s<e?e:s>t?t:s}function Rt(s){return Oi(s,0,1)}function ii(s,e,t){return s+(e-s)*t}function kh(s,e,t){return s===e?0:(t-s)/(e-s)}function Qn(s,e,t,i,n){return ii(i,n,Rt(kh(e,t,s)))}function Ke(s,e,t,i){return ii(s,e,1-Math.exp(-t*i))}function zh(s){const e=Math.sin(s*127.1)*43758.5453123;return e-Math.floor(e)}function Us(s){let e=s>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function jr(s,e){return Math.abs(s)<e?0:s-Math.sign(s)*e}class Sl{constructor(e,t){this.enterBelow=e,this.exitAbove=t}state=!1;update(e){return this.state?e>this.exitAbove&&(this.state=!1):e<this.enterBelow&&(this.state=!0),this.state}get value(){return this.state}reset(){this.state=!1}}class Ps{constructor(e){this.lambda=e}initialised=!1;current=0;update(e,t){return this.initialised?(this.current=Ke(this.current,e,this.lambda,t),this.current):(this.current=e,this.initialised=!0,this.current)}get value(){return this.current}reset(e=0){this.current=e,this.initialised=!1}}class Nr{constructor(e=1,t=0,i=1){this.minCutoff=e,this.beta=t,this.dCutoff=i}firstTime=!0;xPrev=0;dxPrev=0;static alpha(e,t){return 1/(1+1/(Nt*e)/t)}filter(e,t){if(t<=0)return this.firstTime?e:this.xPrev;if(this.firstTime)return this.firstTime=!1,this.xPrev=e,this.dxPrev=0,e;const i=(e-this.xPrev)/t,n=Nr.alpha(this.dCutoff,t),r=n*i+(1-n)*this.dxPrev,a=this.minCutoff+this.beta*Math.abs(r),o=Nr.alpha(a,t),c=o*e+(1-o)*this.xPrev;return this.xPrev=c,this.dxPrev=r,c}reset(){this.firstTime=!0,this.xPrev=0,this.dxPrev=0}}class Hh{constructor(e,t){this.holdSeconds=t,this.candidate=e,this.accepted=e}candidate;accepted;elapsed=0;update(e,t){return e===this.candidate?(this.elapsed+=t,this.elapsed>=this.holdSeconds&&(this.accepted=this.candidate)):(this.candidate=e,this.elapsed=0),this.accepted}get value(){return this.accepted}force(e){this.candidate=e,this.accepted=e,this.elapsed=this.holdSeconds}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ho="185",Vh=0,yl=1,Gh=2,Ar=1,Wh=2,Rs=3,ki=0,$t=1,Ot=2,Ai=0,es=1,Qe=2,Ml=3,bl=4,Xh=5,mn=100,qh=101,Yh=102,$h=103,Kh=104,Zh=200,Jh=201,Qh=202,jh=203,Wa=204,Xa=205,eu=206,tu=207,iu=208,nu=209,su=210,ru=211,au=212,ou=213,lu=214,qa=0,Ya=1,$a=2,ss=3,Ka=4,Za=5,Ja=6,Qa=7,Hc=0,cu=1,hu=2,Ri=0,Vc=1,Gc=2,Wc=3,Vo=4,Xc=5,qc=6,Yc=7,$c=300,yn=301,rs=302,ea=303,ta=304,qr=306,Ur=1e3,Ti=1001,ja=1002,Ft=1003,uu=1004,Hs=1005,Gt=1006,ia=1007,xn=1008,si=1009,Kc=1010,Zc=1011,Is=1012,Go=1013,Ci=1014,mi=1015,ri=1016,Wo=1017,Xo=1018,Ds=1020,Jc=35902,Qc=35899,jc=1021,eh=1022,gi=1023,zi=1026,_n=1027,qo=1028,Yo=1029,Mn=1030,$o=1031,Ko=1033,Rr=33776,Cr=33777,Pr=33778,Lr=33779,eo=35840,to=35841,io=35842,no=35843,so=36196,ro=37492,ao=37496,oo=37488,lo=37489,Or=37490,co=37491,ho=37808,uo=37809,fo=37810,po=37811,mo=37812,go=37813,vo=37814,xo=37815,_o=37816,So=37817,yo=37818,Mo=37819,bo=37820,Eo=37821,To=36492,wo=36494,Ao=36495,Ro=36283,Co=36284,Fr=36285,Po=36286,du=3200,Lo=0,fu=1,tn="",Vt="srgb",Br="srgb-linear",kr="linear",st="srgb",Rn=7680,El=519,pu=512,mu=513,gu=514,Zo=515,vu=516,xu=517,Jo=518,_u=519,Io=35044,Su=35048,Tl="300 es",wi=2e3,Ns=2001;function yu(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function zr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Mu(){const s=zr("canvas");return s.style.display="block",s}const wl={};function Hr(...s){const e="THREE."+s.shift();console.log(e,...s)}function th(s){const e=s[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=s[1];t&&t.isStackTrace?s[0]+=" "+t.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Ue(...s){s=th(s);const e="THREE."+s.shift();{const t=s[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...s)}}function $e(...s){s=th(s);const e="THREE."+s.shift();{const t=s[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...s)}}function ts(...s){const e=s.join(" ");e in wl||(wl[e]=!0,Ue(...s))}function bu(s,e,t){return new Promise(function(i,n){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:n();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const Eu={[qa]:Ya,[$a]:Ja,[Ka]:Qa,[ss]:Za,[Ya]:qa,[Ja]:$a,[Qa]:Ka,[Za]:ss};class bn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const n=i[e];if(n!==void 0){const r=n.indexOf(t);r!==-1&&n.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const n=i.slice(0);for(let r=0,a=n.length;r<a;r++)n[r].call(this,e);e.target=null}}}const zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],na=Math.PI/180,Do=180/Math.PI;function sn(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(zt[s&255]+zt[s>>8&255]+zt[s>>16&255]+zt[s>>24&255]+"-"+zt[e&255]+zt[e>>8&255]+"-"+zt[e>>16&15|64]+zt[e>>24&255]+"-"+zt[t&63|128]+zt[t>>8&255]+"-"+zt[t>>16&255]+zt[t>>24&255]+zt[i&255]+zt[i>>8&255]+zt[i>>16&255]+zt[i>>24&255]).toLowerCase()}function qe(s,e,t){return Math.max(e,Math.min(t,s))}function Tu(s,e){return(s%e+e)%e}function sa(s,e,t){return(1-t)*s+t*e}function Ei(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function lt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class we{static{we.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,n=e.elements;return this.x=n[0]*t+n[3]*i+n[6],this.y=n[1]*t+n[4]*i+n[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(qe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),n=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*n+e.x,this.y=r*n+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Hi{constructor(e=0,t=0,i=0,n=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=n}static slerpFlat(e,t,i,n,r,a,o){let c=i[n+0],l=i[n+1],h=i[n+2],p=i[n+3],u=r[a+0],m=r[a+1],g=r[a+2],x=r[a+3];if(p!==x||c!==u||l!==m||h!==g){let f=c*u+l*m+h*g+p*x;f<0&&(u=-u,m=-m,g=-g,x=-x,f=-f);let d=1-o;if(f<.9995){const T=Math.acos(f),E=Math.sin(T);d=Math.sin(d*T)/E,o=Math.sin(o*T)/E,c=c*d+u*o,l=l*d+m*o,h=h*d+g*o,p=p*d+x*o}else{c=c*d+u*o,l=l*d+m*o,h=h*d+g*o,p=p*d+x*o;const T=1/Math.sqrt(c*c+l*l+h*h+p*p);c*=T,l*=T,h*=T,p*=T}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=p}static multiplyQuaternionsFlat(e,t,i,n,r,a){const o=i[n],c=i[n+1],l=i[n+2],h=i[n+3],p=r[a],u=r[a+1],m=r[a+2],g=r[a+3];return e[t]=o*g+h*p+c*m-l*u,e[t+1]=c*g+h*u+l*p-o*m,e[t+2]=l*g+h*m+o*u-c*p,e[t+3]=h*g-o*p-c*u-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,n){return this._x=e,this._y=t,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,n=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(i/2),h=o(n/2),p=o(r/2),u=c(i/2),m=c(n/2),g=c(r/2);switch(a){case"XYZ":this._x=u*h*p+l*m*g,this._y=l*m*p-u*h*g,this._z=l*h*g+u*m*p,this._w=l*h*p-u*m*g;break;case"YXZ":this._x=u*h*p+l*m*g,this._y=l*m*p-u*h*g,this._z=l*h*g-u*m*p,this._w=l*h*p+u*m*g;break;case"ZXY":this._x=u*h*p-l*m*g,this._y=l*m*p+u*h*g,this._z=l*h*g+u*m*p,this._w=l*h*p-u*m*g;break;case"ZYX":this._x=u*h*p-l*m*g,this._y=l*m*p+u*h*g,this._z=l*h*g-u*m*p,this._w=l*h*p+u*m*g;break;case"YZX":this._x=u*h*p+l*m*g,this._y=l*m*p+u*h*g,this._z=l*h*g-u*m*p,this._w=l*h*p-u*m*g;break;case"XZY":this._x=u*h*p-l*m*g,this._y=l*m*p-u*h*g,this._z=l*h*g+u*m*p,this._w=l*h*p+u*m*g;break;default:Ue("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,n=Math.sin(i);return this._x=e.x*n,this._y=e.y*n,this._z=e.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],n=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],p=t[10],u=i+o+p;if(u>0){const m=.5/Math.sqrt(u+1);this._w=.25/m,this._x=(h-c)*m,this._y=(r-l)*m,this._z=(a-n)*m}else if(i>o&&i>p){const m=2*Math.sqrt(1+i-o-p);this._w=(h-c)/m,this._x=.25*m,this._y=(n+a)/m,this._z=(r+l)/m}else if(o>p){const m=2*Math.sqrt(1+o-i-p);this._w=(r-l)/m,this._x=(n+a)/m,this._y=.25*m,this._z=(c+h)/m}else{const m=2*Math.sqrt(1+p-i-o);this._w=(a-n)/m,this._x=(r+l)/m,this._y=(c+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(qe(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const n=Math.min(1,t/i);return this.slerp(e,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,n=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=i*h+a*o+n*l-r*c,this._y=n*h+a*c+r*o-i*l,this._z=r*h+a*l+i*c-n*o,this._w=a*h-i*o-n*c-r*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,n=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,n=-n,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+i*t,this._y=this._y*c+n*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+n*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),n=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(n*Math.sin(e),n*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{static{P.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Al.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Al.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,n=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*n,this.y=r[1]*t+r[4]*i+r[7]*n,this.z=r[2]*t+r[5]*i+r[8]*n,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,n=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*n+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*n+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*n+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*n+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,n=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*n-o*i),h=2*(o*t-r*n),p=2*(r*i-a*t);return this.x=t+c*l+a*p-o*h,this.y=i+c*h+o*l-r*p,this.z=n+c*p+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,n=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*n,this.y=r[1]*t+r[5]*i+r[9]*n,this.z=r[2]*t+r[6]*i+r[10]*n,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this.z=qe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this.z=qe(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,n=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=n*c-r*o,this.y=r*a-i*c,this.z=i*o-n*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return ra.copy(this).projectOnVector(e),this.sub(ra)}reflect(e){return this.sub(ra.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(qe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,n=this.z-e.z;return t*t+i*i+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const n=Math.sin(t)*e;return this.x=n*Math.sin(i),this.y=Math.cos(t)*e,this.z=n*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),n=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=n,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ra=new P,Al=new Hi;class Oe{static{Oe.prototype.isMatrix3=!0}constructor(e,t,i,n,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,n,r,a,o,c,l)}set(e,t,i,n,r,a,o,c,l){const h=this.elements;return h[0]=e,h[1]=n,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=i,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,n=t.elements,r=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],h=i[4],p=i[7],u=i[2],m=i[5],g=i[8],x=n[0],f=n[3],d=n[6],T=n[1],E=n[4],S=n[7],M=n[2],b=n[5],R=n[8];return r[0]=a*x+o*T+c*M,r[3]=a*f+o*E+c*b,r[6]=a*d+o*S+c*R,r[1]=l*x+h*T+p*M,r[4]=l*f+h*E+p*b,r[7]=l*d+h*S+p*R,r[2]=u*x+m*T+g*M,r[5]=u*f+m*E+g*b,r[8]=u*d+m*S+g*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-i*r*h+i*o*c+n*r*l-n*a*c}invert(){const e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],p=h*a-o*l,u=o*c-h*r,m=l*r-a*c,g=t*p+i*u+n*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return e[0]=p*x,e[1]=(n*l-h*i)*x,e[2]=(o*i-n*a)*x,e[3]=u*x,e[4]=(h*t-n*c)*x,e[5]=(n*r-o*t)*x,e[6]=m*x,e[7]=(i*c-l*t)*x,e[8]=(a*t-i*r)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,n,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*a+l*o)+a+e,-n*l,n*c,-n*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return ts("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(aa.makeScale(e,t)),this}rotate(e){return ts("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(aa.makeRotation(-e)),this}translate(e,t){return ts("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(aa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let n=0;n<9;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const aa=new Oe,Rl=new Oe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Cl=new Oe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function wu(){const s={enabled:!0,workingColorSpace:Br,spaces:{},convert:function(n,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===st&&(n.r=Fi(n.r),n.g=Fi(n.g),n.b=Fi(n.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(n.applyMatrix3(this.spaces[r].toXYZ),n.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===st&&(n.r=is(n.r),n.g=is(n.g),n.b=is(n.b))),n},workingToColorSpace:function(n,r){return this.convert(n,this.workingColorSpace,r)},colorSpaceToWorking:function(n,r){return this.convert(n,r,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===tn?kr:this.spaces[n].transfer},getToneMappingMode:function(n){return this.spaces[n].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(n,r=this.workingColorSpace){return n.fromArray(this.spaces[r].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,r,a){return n.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(n,r){return ts("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(n,r)},toWorkingColorSpace:function(n,r){return ts("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(n,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return s.define({[Br]:{primaries:e,whitePoint:i,transfer:kr,toXYZ:Rl,fromXYZ:Cl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Vt},outputColorSpaceConfig:{drawingBufferColorSpace:Vt}},[Vt]:{primaries:e,whitePoint:i,transfer:st,toXYZ:Rl,fromXYZ:Cl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Vt}}}),s}const Xe=wu();function Fi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function is(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Cn;class Au{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Cn===void 0&&(Cn=zr("canvas")),Cn.width=e.width,Cn.height=e.height;const n=Cn.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),i=Cn}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=zr("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const n=i.getImageData(0,0,e.width,e.height),r=n.data;for(let a=0;a<r.length;a++)r[a]=Fi(r[a]/255)*255;return i.putImageData(n,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Fi(t[i]/255)*255):t[i]=Fi(t[i]);return{data:t,width:e.width,height:e.height}}else return Ue("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Ru=0;class Qo{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ru++}),this.uuid=sn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let r;if(Array.isArray(n)){r=[];for(let a=0,o=n.length;a<o;a++)n[a].isDataTexture?r.push(oa(n[a].image)):r.push(oa(n[a]))}else r=oa(n);i.url=r}return t||(e.images[this.uuid]=i),i}}function oa(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Au.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Ue("Texture: Unable to serialize Texture."),{})}let Cu=0;const la=new P;class Wt extends bn{constructor(e=Wt.DEFAULT_IMAGE,t=Wt.DEFAULT_MAPPING,i=Ti,n=Ti,r=Gt,a=xn,o=gi,c=si,l=Wt.DEFAULT_ANISOTROPY,h=tn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Cu++}),this.uuid=sn(),this.name="",this.source=new Qo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new we(0,0),this.repeat=new we(1,1),this.center=new we(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Oe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(la).x}get height(){return this.source.getSize(la).y}get depth(){return this.source.getSize(la).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Ue(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const n=this[t];if(n===void 0){Ue(`Texture.setValues(): property '${t}' does not exist.`);continue}n&&i&&n.isVector2&&i.isVector2||n&&i&&n.isVector3&&i.isVector3||n&&i&&n.isMatrix3&&i.isMatrix3?n.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==$c)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ur:e.x=e.x-Math.floor(e.x);break;case Ti:e.x=e.x<0?0:1;break;case ja:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ur:e.y=e.y-Math.floor(e.y);break;case Ti:e.y=e.y<0?0:1;break;case ja:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Wt.DEFAULT_IMAGE=null;Wt.DEFAULT_MAPPING=$c;Wt.DEFAULT_ANISOTROPY=1;class dt{static{dt.prototype.isVector4=!0}constructor(e=0,t=0,i=0,n=1){this.x=e,this.y=t,this.z=i,this.w=n}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,n){return this.x=e,this.y=t,this.z=i,this.w=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,n=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*n+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*n+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*n+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*n+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,n,r;const c=e.elements,l=c[0],h=c[4],p=c[8],u=c[1],m=c[5],g=c[9],x=c[2],f=c[6],d=c[10];if(Math.abs(h-u)<.01&&Math.abs(p-x)<.01&&Math.abs(g-f)<.01){if(Math.abs(h+u)<.1&&Math.abs(p+x)<.1&&Math.abs(g+f)<.1&&Math.abs(l+m+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(l+1)/2,S=(m+1)/2,M=(d+1)/2,b=(h+u)/4,R=(p+x)/4,_=(g+f)/4;return E>S&&E>M?E<.01?(i=0,n=.707106781,r=.707106781):(i=Math.sqrt(E),n=b/i,r=R/i):S>M?S<.01?(i=.707106781,n=0,r=.707106781):(n=Math.sqrt(S),i=b/n,r=_/n):M<.01?(i=.707106781,n=.707106781,r=0):(r=Math.sqrt(M),i=R/r,n=_/r),this.set(i,n,r,t),this}let T=Math.sqrt((f-g)*(f-g)+(p-x)*(p-x)+(u-h)*(u-h));return Math.abs(T)<.001&&(T=1),this.x=(f-g)/T,this.y=(p-x)/T,this.z=(u-h)/T,this.w=Math.acos((l+m+d-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this.z=qe(this.z,e.z,t.z),this.w=qe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this.z=qe(this.z,e,t),this.w=qe(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Pu extends bn{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Gt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new dt(0,0,e,t),this.scissorTest=!1,this.viewport=new dt(0,0,e,t),this.textures=[];const n={width:e,height:t,depth:i.depth},r=new Wt(n),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Gt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let n=0,r=this.textures.length;n<r;n++)this.textures[n].image.width=e,this.textures[n].image.height=t,this.textures[n].image.depth=i,this.textures[n].isData3DTexture!==!0&&(this.textures[n].isArrayTexture=this.textures[n].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const n=Object.assign({},e.textures[t].image);this.textures[t].source=new Qo(n)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Jt extends Pu{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class ih extends Wt{constructor(e=null,t=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=Ft,this.minFilter=Ft,this.wrapR=Ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Lu extends Wt{constructor(e=null,t=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=Ft,this.minFilter=Ft,this.wrapR=Ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class at{static{at.prototype.isMatrix4=!0}constructor(e,t,i,n,r,a,o,c,l,h,p,u,m,g,x,f){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,n,r,a,o,c,l,h,p,u,m,g,x,f)}set(e,t,i,n,r,a,o,c,l,h,p,u,m,g,x,f){const d=this.elements;return d[0]=e,d[4]=t,d[8]=i,d[12]=n,d[1]=r,d[5]=a,d[9]=o,d[13]=c,d[2]=l,d[6]=h,d[10]=p,d[14]=u,d[3]=m,d[7]=g,d[11]=x,d[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new at().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,n=1/Pn.setFromMatrixColumn(e,0).length(),r=1/Pn.setFromMatrixColumn(e,1).length(),a=1/Pn.setFromMatrixColumn(e,2).length();return t[0]=i[0]*n,t[1]=i[1]*n,t[2]=i[2]*n,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,n=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(n),l=Math.sin(n),h=Math.cos(r),p=Math.sin(r);if(e.order==="XYZ"){const u=a*h,m=a*p,g=o*h,x=o*p;t[0]=c*h,t[4]=-c*p,t[8]=l,t[1]=m+g*l,t[5]=u-x*l,t[9]=-o*c,t[2]=x-u*l,t[6]=g+m*l,t[10]=a*c}else if(e.order==="YXZ"){const u=c*h,m=c*p,g=l*h,x=l*p;t[0]=u+x*o,t[4]=g*o-m,t[8]=a*l,t[1]=a*p,t[5]=a*h,t[9]=-o,t[2]=m*o-g,t[6]=x+u*o,t[10]=a*c}else if(e.order==="ZXY"){const u=c*h,m=c*p,g=l*h,x=l*p;t[0]=u-x*o,t[4]=-a*p,t[8]=g+m*o,t[1]=m+g*o,t[5]=a*h,t[9]=x-u*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const u=a*h,m=a*p,g=o*h,x=o*p;t[0]=c*h,t[4]=g*l-m,t[8]=u*l+x,t[1]=c*p,t[5]=x*l+u,t[9]=m*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const u=a*c,m=a*l,g=o*c,x=o*l;t[0]=c*h,t[4]=x-u*p,t[8]=g*p+m,t[1]=p,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=m*p+g,t[10]=u-x*p}else if(e.order==="XZY"){const u=a*c,m=a*l,g=o*c,x=o*l;t[0]=c*h,t[4]=-p,t[8]=l*h,t[1]=u*p+x,t[5]=a*h,t[9]=m*p-g,t[2]=g*p-m,t[6]=o*h,t[10]=x*p+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Iu,e,Du)}lookAt(e,t,i){const n=this.elements;return jt.subVectors(e,t),jt.lengthSq()===0&&(jt.z=1),jt.normalize(),$i.crossVectors(i,jt),$i.lengthSq()===0&&(Math.abs(i.z)===1?jt.x+=1e-4:jt.z+=1e-4,jt.normalize(),$i.crossVectors(i,jt)),$i.normalize(),Vs.crossVectors(jt,$i),n[0]=$i.x,n[4]=Vs.x,n[8]=jt.x,n[1]=$i.y,n[5]=Vs.y,n[9]=jt.y,n[2]=$i.z,n[6]=Vs.z,n[10]=jt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,n=t.elements,r=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],h=i[1],p=i[5],u=i[9],m=i[13],g=i[2],x=i[6],f=i[10],d=i[14],T=i[3],E=i[7],S=i[11],M=i[15],b=n[0],R=n[4],_=n[8],w=n[12],L=n[1],C=n[5],I=n[9],H=n[13],X=n[2],F=n[6],W=n[10],G=n[14],$=n[3],Q=n[7],ie=n[11],se=n[15];return r[0]=a*b+o*L+c*X+l*$,r[4]=a*R+o*C+c*F+l*Q,r[8]=a*_+o*I+c*W+l*ie,r[12]=a*w+o*H+c*G+l*se,r[1]=h*b+p*L+u*X+m*$,r[5]=h*R+p*C+u*F+m*Q,r[9]=h*_+p*I+u*W+m*ie,r[13]=h*w+p*H+u*G+m*se,r[2]=g*b+x*L+f*X+d*$,r[6]=g*R+x*C+f*F+d*Q,r[10]=g*_+x*I+f*W+d*ie,r[14]=g*w+x*H+f*G+d*se,r[3]=T*b+E*L+S*X+M*$,r[7]=T*R+E*C+S*F+M*Q,r[11]=T*_+E*I+S*W+M*ie,r[15]=T*w+E*H+S*G+M*se,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],n=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],p=e[6],u=e[10],m=e[14],g=e[3],x=e[7],f=e[11],d=e[15],T=c*m-l*u,E=o*m-l*p,S=o*u-c*p,M=a*m-l*h,b=a*u-c*h,R=a*p-o*h;return t*(x*T-f*E+d*S)-i*(g*T-f*M+d*b)+n*(g*E-x*M+d*R)-r*(g*S-x*b+f*R)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],n=e[8],r=e[1],a=e[5],o=e[9],c=e[2],l=e[6],h=e[10];return t*(a*h-o*l)-i*(r*h-o*c)+n*(r*l-a*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const n=this.elements;return e.isVector3?(n[12]=e.x,n[13]=e.y,n[14]=e.z):(n[12]=e,n[13]=t,n[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],p=e[9],u=e[10],m=e[11],g=e[12],x=e[13],f=e[14],d=e[15],T=t*o-i*a,E=t*c-n*a,S=t*l-r*a,M=i*c-n*o,b=i*l-r*o,R=n*l-r*c,_=h*x-p*g,w=h*f-u*g,L=h*d-m*g,C=p*f-u*x,I=p*d-m*x,H=u*d-m*f,X=T*H-E*I+S*C+M*L-b*w+R*_;if(X===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const F=1/X;return e[0]=(o*H-c*I+l*C)*F,e[1]=(n*I-i*H-r*C)*F,e[2]=(x*R-f*b+d*M)*F,e[3]=(u*b-p*R-m*M)*F,e[4]=(c*L-a*H-l*w)*F,e[5]=(t*H-n*L+r*w)*F,e[6]=(f*S-g*R-d*E)*F,e[7]=(h*R-u*S+m*E)*F,e[8]=(a*I-o*L+l*_)*F,e[9]=(i*L-t*I-r*_)*F,e[10]=(g*b-x*S+d*T)*F,e[11]=(p*S-h*b-m*T)*F,e[12]=(o*w-a*C-c*_)*F,e[13]=(t*C-i*w+n*_)*F,e[14]=(x*E-g*M-f*T)*F,e[15]=(h*M-p*E+u*T)*F,this}scale(e){const t=this.elements,i=e.x,n=e.y,r=e.z;return t[0]*=i,t[4]*=n,t[8]*=r,t[1]*=i,t[5]*=n,t[9]*=r,t[2]*=i,t[6]*=n,t[10]*=r,t[3]*=i,t[7]*=n,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],n=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,n))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),n=Math.sin(t),r=1-i,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+i,l*o-n*c,l*c+n*o,0,l*o+n*c,h*o+i,h*c-n*a,0,l*c-n*o,h*c+n*a,r*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,n,r,a){return this.set(1,i,r,0,e,1,a,0,t,n,1,0,0,0,0,1),this}compose(e,t,i){const n=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,h=a+a,p=o+o,u=r*l,m=r*h,g=r*p,x=a*h,f=a*p,d=o*p,T=c*l,E=c*h,S=c*p,M=i.x,b=i.y,R=i.z;return n[0]=(1-(x+d))*M,n[1]=(m+S)*M,n[2]=(g-E)*M,n[3]=0,n[4]=(m-S)*b,n[5]=(1-(u+d))*b,n[6]=(f+T)*b,n[7]=0,n[8]=(g+E)*R,n[9]=(f-T)*R,n[10]=(1-(u+x))*R,n[11]=0,n[12]=e.x,n[13]=e.y,n[14]=e.z,n[15]=1,this}decompose(e,t,i){const n=this.elements;e.x=n[12],e.y=n[13],e.z=n[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let a=Pn.set(n[0],n[1],n[2]).length();const o=Pn.set(n[4],n[5],n[6]).length(),c=Pn.set(n[8],n[9],n[10]).length();r<0&&(a=-a),di.copy(this);const l=1/a,h=1/o,p=1/c;return di.elements[0]*=l,di.elements[1]*=l,di.elements[2]*=l,di.elements[4]*=h,di.elements[5]*=h,di.elements[6]*=h,di.elements[8]*=p,di.elements[9]*=p,di.elements[10]*=p,t.setFromRotationMatrix(di),i.x=a,i.y=o,i.z=c,this}makePerspective(e,t,i,n,r,a,o=wi,c=!1){const l=this.elements,h=2*r/(t-e),p=2*r/(i-n),u=(t+e)/(t-e),m=(i+n)/(i-n);let g,x;if(c)g=r/(a-r),x=a*r/(a-r);else if(o===wi)g=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===Ns)g=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=p,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,n,r,a,o=wi,c=!1){const l=this.elements,h=2/(t-e),p=2/(i-n),u=-(t+e)/(t-e),m=-(i+n)/(i-n);let g,x;if(c)g=1/(a-r),x=a/(a-r);else if(o===wi)g=-2/(a-r),x=-(a+r)/(a-r);else if(o===Ns)g=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=p,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let n=0;n<16;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Pn=new P,di=new at,Iu=new P(0,0,0),Du=new P(1,1,1),$i=new P,Vs=new P,jt=new P,Pl=new at,Ll=new Hi;class rn{constructor(e=0,t=0,i=0,n=rn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=n}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,n=this._order){return this._x=e,this._y=t,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const n=e.elements,r=n[0],a=n[4],o=n[8],c=n[1],l=n[5],h=n[9],p=n[2],u=n[6],m=n[10];switch(t){case"XYZ":this._y=Math.asin(qe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-qe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-p,r),this._z=0);break;case"ZXY":this._x=Math.asin(qe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-p,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-qe(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(u,m),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(qe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-p,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-qe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,m),this._y=0);break;default:Ue("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Pl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Pl,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ll.setFromEuler(this),this.setFromQuaternion(Ll,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}rn.DEFAULT_ORDER="XYZ";class nh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Nu=0;const Il=new P,Ln=new Hi,Pi=new at,Gs=new P,ds=new P,Uu=new P,Ou=new Hi,Dl=new P(1,0,0),Nl=new P(0,1,0),Ul=new P(0,0,1),Ol={type:"added"},Fu={type:"removed"},In={type:"childadded",child:null},ca={type:"childremoved",child:null};class Pt extends bn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Nu++}),this.uuid=sn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Pt.DEFAULT_UP.clone();const e=new P,t=new rn,i=new Hi,n=new P(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new at},normalMatrix:{value:new Oe}}),this.matrix=new at,this.matrixWorld=new at,this.matrixAutoUpdate=Pt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new nh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ln.setFromAxisAngle(e,t),this.quaternion.multiply(Ln),this}rotateOnWorldAxis(e,t){return Ln.setFromAxisAngle(e,t),this.quaternion.premultiply(Ln),this}rotateX(e){return this.rotateOnAxis(Dl,e)}rotateY(e){return this.rotateOnAxis(Nl,e)}rotateZ(e){return this.rotateOnAxis(Ul,e)}translateOnAxis(e,t){return Il.copy(e).applyQuaternion(this.quaternion),this.position.add(Il.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Dl,e)}translateY(e){return this.translateOnAxis(Nl,e)}translateZ(e){return this.translateOnAxis(Ul,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Pi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Gs.copy(e):Gs.set(e,t,i);const n=this.parent;this.updateWorldMatrix(!0,!1),ds.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Pi.lookAt(ds,Gs,this.up):Pi.lookAt(Gs,ds,this.up),this.quaternion.setFromRotationMatrix(Pi),n&&(Pi.extractRotation(n.matrixWorld),Ln.setFromRotationMatrix(Pi),this.quaternion.premultiply(Ln.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?($e("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ol),In.child=e,this.dispatchEvent(In),In.child=null):$e("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Fu),ca.child=e,this.dispatchEvent(ca),ca.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Pi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Pi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Pi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ol),In.child=e,this.dispatchEvent(In),In.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,n=this.children.length;i<n;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ds,e,Uu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ds,Ou,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,n=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*n,r[13]+=i-r[1]*t-r[5]*i-r[9]*n,r[14]+=n-r[2]*t-r[6]*i-r[10]*n}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const n={};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.castShadow===!0&&(n.castShadow=!0),this.receiveShadow===!0&&(n.receiveShadow=!0),this.visible===!1&&(n.visible=!1),this.frustumCulled===!1&&(n.frustumCulled=!1),this.renderOrder!==0&&(n.renderOrder=this.renderOrder),this.static!==!1&&(n.static=this.static),Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.pivot!==null&&(n.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(n.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(n.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(n.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),n.instanceInfo=this._instanceInfo.map(o=>({...o})),n.availableInstanceIds=this._availableInstanceIds.slice(),n.availableGeometryIds=this._availableGeometryIds.slice(),n.nextIndexStart=this._nextIndexStart,n.nextVertexStart=this._nextVertexStart,n.geometryCount=this._geometryCount,n.maxInstanceCount=this._maxInstanceCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.matricesTexture=this._matricesTexture.toJSON(e),n.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(n.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(n.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(n.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const p=c[l];r(e.shapes,p)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));n.material=o}else n.material=r(e.materials,this.material);if(this.children.length>0){n.children=[];for(let o=0;o<this.children.length;o++)n.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){n.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];n.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),p=a(e.shapes),u=a(e.skeletons),m=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),p.length>0&&(i.shapes=p),u.length>0&&(i.skeletons=u),m.length>0&&(i.animations=m),g.length>0&&(i.nodes=g)}return i.object=n,i;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const n=e.children[i];this.add(n.clone())}return this}}Pt.DEFAULT_UP=new P(0,1,0);Pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Bt extends Pt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Bu={type:"move"};class ha{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Bt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Bt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Bt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let n=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const x of e.hand.values()){const f=t.getJointPose(x,i),d=this._getHandJoint(l,x);f!==null&&(d.matrix.fromArray(f.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=f.radius),d.visible=f!==null}const h=l.joints["index-finger-tip"],p=l.joints["thumb-tip"],u=h.position.distanceTo(p.position),m=.02,g=.005;l.inputState.pinching&&u>m+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=m-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(n=t.getPose(e.targetRaySpace,i),n===null&&r!==null&&(n=r),n!==null&&(o.matrix.fromArray(n.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,n.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(n.linearVelocity)):o.hasLinearVelocity=!1,n.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(n.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Bu)))}return o!==null&&(o.visible=n!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Bt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const sh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ki={h:0,s:0,l:0},Ws={h:0,s:0,l:0};function ua(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class te{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const n=e;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Vt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Xe.colorSpaceToWorking(this,t),this}setRGB(e,t,i,n=Xe.workingColorSpace){return this.r=e,this.g=t,this.b=i,Xe.colorSpaceToWorking(this,n),this}setHSL(e,t,i,n=Xe.workingColorSpace){if(e=Tu(e,1),t=qe(t,0,1),i=qe(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=ua(a,r,e+1/3),this.g=ua(a,r,e),this.b=ua(a,r,e-1/3)}return Xe.colorSpaceToWorking(this,n),this}setStyle(e,t=Vt){function i(r){r!==void 0&&parseFloat(r)<1&&Ue("Color: Alpha component of "+e+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=n[1],o=n[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ue("Color: Unknown color model "+e)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=n[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Ue("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Vt){const i=sh[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ue("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Fi(e.r),this.g=Fi(e.g),this.b=Fi(e.b),this}copyLinearToSRGB(e){return this.r=is(e.r),this.g=is(e.g),this.b=is(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Vt){return Xe.workingToColorSpace(Ht.copy(this),e),Math.round(qe(Ht.r*255,0,255))*65536+Math.round(qe(Ht.g*255,0,255))*256+Math.round(qe(Ht.b*255,0,255))}getHexString(e=Vt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Xe.workingColorSpace){Xe.workingToColorSpace(Ht.copy(this),t);const i=Ht.r,n=Ht.g,r=Ht.b,a=Math.max(i,n,r),o=Math.min(i,n,r);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const p=a-o;switch(l=h<=.5?p/(a+o):p/(2-a-o),a){case i:c=(n-r)/p+(n<r?6:0);break;case n:c=(r-i)/p+2;break;case r:c=(i-n)/p+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Xe.workingColorSpace){return Xe.workingToColorSpace(Ht.copy(this),t),e.r=Ht.r,e.g=Ht.g,e.b=Ht.b,e}getStyle(e=Vt){Xe.workingToColorSpace(Ht.copy(this),e);const t=Ht.r,i=Ht.g,n=Ht.b;return e!==Vt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(e,t,i){return this.getHSL(Ki),this.setHSL(Ki.h+e,Ki.s+t,Ki.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Ki),e.getHSL(Ws);const i=sa(Ki.h,Ws.h,t),n=sa(Ki.s,Ws.s,t),r=sa(Ki.l,Ws.l,t);return this.setHSL(i,n,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,n=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*n,this.g=r[1]*t+r[4]*i+r[7]*n,this.b=r[2]*t+r[5]*i+r[8]*n,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ht=new te;te.NAMES=sh;class jo{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new te(e),this.density=t}clone(){return new jo(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class ku extends Pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new rn,this.environmentIntensity=1,this.environmentRotation=new rn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const fi=new P,Li=new P,da=new P,Ii=new P,Dn=new P,Nn=new P,Fl=new P,fa=new P,pa=new P,ma=new P,ga=new dt,va=new dt,xa=new dt;class ci{constructor(e=new P,t=new P,i=new P){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,n){n.subVectors(i,t),fi.subVectors(e,t),n.cross(fi);const r=n.lengthSq();return r>0?n.multiplyScalar(1/Math.sqrt(r)):n.set(0,0,0)}static getBarycoord(e,t,i,n,r){fi.subVectors(n,t),Li.subVectors(i,t),da.subVectors(e,t);const a=fi.dot(fi),o=fi.dot(Li),c=fi.dot(da),l=Li.dot(Li),h=Li.dot(da),p=a*l-o*o;if(p===0)return r.set(0,0,0),null;const u=1/p,m=(l*c-o*h)*u,g=(a*h-o*c)*u;return r.set(1-m-g,g,m)}static containsPoint(e,t,i,n){return this.getBarycoord(e,t,i,n,Ii)===null?!1:Ii.x>=0&&Ii.y>=0&&Ii.x+Ii.y<=1}static getInterpolation(e,t,i,n,r,a,o,c){return this.getBarycoord(e,t,i,n,Ii)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Ii.x),c.addScaledVector(a,Ii.y),c.addScaledVector(o,Ii.z),c)}static getInterpolatedAttribute(e,t,i,n,r,a){return ga.setScalar(0),va.setScalar(0),xa.setScalar(0),ga.fromBufferAttribute(e,t),va.fromBufferAttribute(e,i),xa.fromBufferAttribute(e,n),a.setScalar(0),a.addScaledVector(ga,r.x),a.addScaledVector(va,r.y),a.addScaledVector(xa,r.z),a}static isFrontFacing(e,t,i,n){return fi.subVectors(i,t),Li.subVectors(e,t),fi.cross(Li).dot(n)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,n){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[n]),this}setFromAttributeAndIndices(e,t,i,n){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return fi.subVectors(this.c,this.b),Li.subVectors(this.a,this.b),fi.cross(Li).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ci.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ci.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,n,r){return ci.getInterpolation(e,this.a,this.b,this.c,t,i,n,r)}containsPoint(e){return ci.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ci.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,n=this.b,r=this.c;let a,o;Dn.subVectors(n,i),Nn.subVectors(r,i),fa.subVectors(e,i);const c=Dn.dot(fa),l=Nn.dot(fa);if(c<=0&&l<=0)return t.copy(i);pa.subVectors(e,n);const h=Dn.dot(pa),p=Nn.dot(pa);if(h>=0&&p<=h)return t.copy(n);const u=c*p-h*l;if(u<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(i).addScaledVector(Dn,a);ma.subVectors(e,r);const m=Dn.dot(ma),g=Nn.dot(ma);if(g>=0&&m<=g)return t.copy(r);const x=m*l-c*g;if(x<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(i).addScaledVector(Nn,o);const f=h*g-m*p;if(f<=0&&p-h>=0&&m-g>=0)return Fl.subVectors(r,n),o=(p-h)/(p-h+(m-g)),t.copy(n).addScaledVector(Fl,o);const d=1/(f+x+u);return a=x*d,o=u*d,t.copy(i).addScaledVector(Dn,a).addScaledVector(Nn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class En{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(pi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(pi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=pi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,pi):pi.fromBufferAttribute(r,a),pi.applyMatrix4(e.matrixWorld),this.expandByPoint(pi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Xs.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Xs.copy(i.boundingBox)),Xs.applyMatrix4(e.matrixWorld),this.union(Xs)}const n=e.children;for(let r=0,a=n.length;r<a;r++)this.expandByObject(n[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,pi),pi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(fs),qs.subVectors(this.max,fs),Un.subVectors(e.a,fs),On.subVectors(e.b,fs),Fn.subVectors(e.c,fs),Zi.subVectors(On,Un),Ji.subVectors(Fn,On),ln.subVectors(Un,Fn);let t=[0,-Zi.z,Zi.y,0,-Ji.z,Ji.y,0,-ln.z,ln.y,Zi.z,0,-Zi.x,Ji.z,0,-Ji.x,ln.z,0,-ln.x,-Zi.y,Zi.x,0,-Ji.y,Ji.x,0,-ln.y,ln.x,0];return!_a(t,Un,On,Fn,qs)||(t=[1,0,0,0,1,0,0,0,1],!_a(t,Un,On,Fn,qs))?!1:(Ys.crossVectors(Zi,Ji),t=[Ys.x,Ys.y,Ys.z],_a(t,Un,On,Fn,qs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,pi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(pi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Di[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Di[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Di[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Di[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Di[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Di[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Di[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Di[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Di),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Di=[new P,new P,new P,new P,new P,new P,new P,new P],pi=new P,Xs=new En,Un=new P,On=new P,Fn=new P,Zi=new P,Ji=new P,ln=new P,fs=new P,qs=new P,Ys=new P,cn=new P;function _a(s,e,t,i,n){for(let r=0,a=s.length-3;r<=a;r+=3){cn.fromArray(s,r);const o=n.x*Math.abs(cn.x)+n.y*Math.abs(cn.y)+n.z*Math.abs(cn.z),c=e.dot(cn),l=t.dot(cn),h=i.dot(cn);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const At=new P,$s=new we;let zu=0;class Ie extends bn{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:zu++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Io,this.updateRanges=[],this.gpuType=mi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let n=0,r=this.itemSize;n<r;n++)this.array[e+n]=t.array[i+n];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)$s.fromBufferAttribute(this,t),$s.applyMatrix3(e),this.setXY(t,$s.x,$s.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.applyMatrix3(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.applyMatrix4(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.applyNormalMatrix(e),this.setXYZ(t,At.x,At.y,At.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.transformDirection(e),this.setXYZ(t,At.x,At.y,At.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Ei(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=lt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ei(t,this.array)),t}setX(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ei(t,this.array)),t}setY(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ei(t,this.array)),t}setZ(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ei(t,this.array)),t}setW(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),i=lt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,n){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),i=lt(i,this.array),n=lt(n,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this}setXYZW(e,t,i,n,r){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),i=lt(i,this.array),n=lt(n,this.array),r=lt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Io&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class rh extends Ie{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class ah extends Ie{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class ct extends Ie{constructor(e,t,i){super(new Float32Array(e),t,i)}}const Hu=new En,ps=new P,Sa=new P;class ui{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Hu.setFromPoints(e).getCenter(i);let n=0;for(let r=0,a=e.length;r<a;r++)n=Math.max(n,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(n),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ps.subVectors(e,this.center);const t=ps.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),n=(i-this.radius)*.5;this.center.addScaledVector(ps,n/i),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Sa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ps.copy(e.center).add(Sa)),this.expandByPoint(ps.copy(e.center).sub(Sa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Vu=0;const oi=new at,ya=new Pt,Bn=new P,ei=new En,ms=new En,Dt=new P;class it extends bn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Vu++}),this.uuid=sn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(yu(e)?ah:rh)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Oe().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(e),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return oi.makeRotationFromQuaternion(e),this.applyMatrix4(oi),this}rotateX(e){return oi.makeRotationX(e),this.applyMatrix4(oi),this}rotateY(e){return oi.makeRotationY(e),this.applyMatrix4(oi),this}rotateZ(e){return oi.makeRotationZ(e),this.applyMatrix4(oi),this}translate(e,t,i){return oi.makeTranslation(e,t,i),this.applyMatrix4(oi),this}scale(e,t,i){return oi.makeScale(e,t,i),this.applyMatrix4(oi),this}lookAt(e){return ya.lookAt(e),ya.updateMatrix(),this.applyMatrix4(ya.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Bn).negate(),this.translate(Bn.x,Bn.y,Bn.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let n=0,r=e.length;n<r;n++){const a=e[n];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ct(i,3))}else{const i=Math.min(e.length,t.count);for(let n=0;n<i;n++){const r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&Ue("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new En);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){$e("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,n=t.length;i<n;i++){const r=t[i];ei.setFromBufferAttribute(r),this.morphTargetsRelative?(Dt.addVectors(this.boundingBox.min,ei.min),this.boundingBox.expandByPoint(Dt),Dt.addVectors(this.boundingBox.max,ei.max),this.boundingBox.expandByPoint(Dt)):(this.boundingBox.expandByPoint(ei.min),this.boundingBox.expandByPoint(ei.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&$e('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ui);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){$e("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(e){const i=this.boundingSphere.center;if(ei.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];ms.setFromBufferAttribute(o),this.morphTargetsRelative?(Dt.addVectors(ei.min,ms.min),ei.expandByPoint(Dt),Dt.addVectors(ei.max,ms.max),ei.expandByPoint(Dt)):(ei.expandByPoint(ms.min),ei.expandByPoint(ms.max))}ei.getCenter(i);let n=0;for(let r=0,a=e.count;r<a;r++)Dt.fromBufferAttribute(e,r),n=Math.max(n,i.distanceToSquared(Dt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Dt.fromBufferAttribute(o,l),c&&(Bn.fromBufferAttribute(e,l),Dt.add(Bn)),n=Math.max(n,i.distanceToSquared(Dt))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&$e('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){$e("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,n=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Ie(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],c=[];for(let _=0;_<i.count;_++)o[_]=new P,c[_]=new P;const l=new P,h=new P,p=new P,u=new we,m=new we,g=new we,x=new P,f=new P;function d(_,w,L){l.fromBufferAttribute(i,_),h.fromBufferAttribute(i,w),p.fromBufferAttribute(i,L),u.fromBufferAttribute(r,_),m.fromBufferAttribute(r,w),g.fromBufferAttribute(r,L),h.sub(l),p.sub(l),m.sub(u),g.sub(u);const C=1/(m.x*g.y-g.x*m.y);isFinite(C)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(p,-m.y).multiplyScalar(C),f.copy(p).multiplyScalar(m.x).addScaledVector(h,-g.x).multiplyScalar(C),o[_].add(x),o[w].add(x),o[L].add(x),c[_].add(f),c[w].add(f),c[L].add(f))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let _=0,w=T.length;_<w;++_){const L=T[_],C=L.start,I=L.count;for(let H=C,X=C+I;H<X;H+=3)d(e.getX(H+0),e.getX(H+1),e.getX(H+2))}const E=new P,S=new P,M=new P,b=new P;function R(_){M.fromBufferAttribute(n,_),b.copy(M);const w=o[_];E.copy(w),E.sub(M.multiplyScalar(M.dot(w))).normalize(),S.crossVectors(b,w);const C=S.dot(c[_])<0?-1:1;a.setXYZW(_,E.x,E.y,E.z,C)}for(let _=0,w=T.length;_<w;++_){const L=T[_],C=L.start,I=L.count;for(let H=C,X=C+I;H<X;H+=3)R(e.getX(H+0)),R(e.getX(H+1)),R(e.getX(H+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Ie(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,m=i.count;u<m;u++)i.setXYZ(u,0,0,0);const n=new P,r=new P,a=new P,o=new P,c=new P,l=new P,h=new P,p=new P;if(e)for(let u=0,m=e.count;u<m;u+=3){const g=e.getX(u+0),x=e.getX(u+1),f=e.getX(u+2);n.fromBufferAttribute(t,g),r.fromBufferAttribute(t,x),a.fromBufferAttribute(t,f),h.subVectors(a,r),p.subVectors(n,r),h.cross(p),o.fromBufferAttribute(i,g),c.fromBufferAttribute(i,x),l.fromBufferAttribute(i,f),o.add(h),c.add(h),l.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(x,c.x,c.y,c.z),i.setXYZ(f,l.x,l.y,l.z)}else for(let u=0,m=t.count;u<m;u+=3)n.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),p.subVectors(n,r),h.cross(p),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Dt.fromBufferAttribute(e,t),Dt.normalize(),e.setXYZ(t,Dt.x,Dt.y,Dt.z)}toNonIndexed(){function e(o,c){const l=o.array,h=o.itemSize,p=o.normalized,u=new l.constructor(c.length*h);let m=0,g=0;for(let x=0,f=c.length;x<f;x++){o.isInterleavedBufferAttribute?m=c[x]*o.data.stride+o.offset:m=c[x]*h;for(let d=0;d<h;d++)u[g++]=l[m++]}return new Ie(u,h,p)}if(this.index===null)return Ue("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new it,i=this.index.array,n=this.attributes;for(const o in n){const c=n[o],l=e(c,i);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let h=0,p=l.length;h<p;h++){const u=l[h],m=e(u,i);c.push(m)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const n={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let p=0,u=l.length;p<u;p++){const m=l[p];h.push(m.toJSON(e.data))}h.length>0&&(n[c]=h,r=!0)}r&&(e.data.morphAttributes=n,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const n=e.attributes;for(const l in n){const h=n[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],p=r[l];for(let u=0,m=p.length;u<m;u++)h.push(p[u].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,h=a.length;l<h;l++){const p=a[l];this.addGroup(p.start,p.count,p.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Gu{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Io,this.updateRanges=[],this.version=0,this.uuid=sn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let n=0,r=this.stride;n<r;n++)this.array[e+n]=t.array[i+n];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=sn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=sn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Xt=new P;class Vr{constructor(e,t,i,n=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=n}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Xt.fromBufferAttribute(this,t),Xt.applyMatrix4(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Xt.fromBufferAttribute(this,t),Xt.applyNormalMatrix(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Xt.fromBufferAttribute(this,t),Xt.transformDirection(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=Ei(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=lt(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Ei(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Ei(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Ei(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Ei(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),i=lt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),i=lt(i,this.array),n=lt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=n,this}setXYZW(e,t,i,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),i=lt(i,this.array),n=lt(n,this.array),r=lt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=n,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Hr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[n+r])}return new Ie(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Vr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Hr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[n+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let Wu=0;class an extends bn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Wu++}),this.uuid=sn(),this.name="",this.type="Material",this.blending=es,this.side=ki,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Wa,this.blendDst=Xa,this.blendEquation=mn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new te(0,0,0),this.blendAlpha=0,this.depthFunc=ss,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=El,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Rn,this.stencilZFail=Rn,this.stencilZPass=Rn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Ue(`Material: parameter '${t}' has value of undefined.`);continue}const n=this[t];if(n===void 0){Ue(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector2&&i&&i.isVector2||n&&n.isEuler&&i&&i.isEuler||n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==es&&(i.blending=this.blending),this.side!==ki&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Wa&&(i.blendSrc=this.blendSrc),this.blendDst!==Xa&&(i.blendDst=this.blendDst),this.blendEquation!==mn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ss&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==El&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Rn&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Rn&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Rn&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=n(e.textures),a=n(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new te().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new we().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new we().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const n=t.length;i=new Array(n);for(let r=0;r!==n;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Yr extends an{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new te(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let kn;const gs=new P,zn=new P,Hn=new P,Vn=new we,vs=new we,oh=new at,Ks=new P,xs=new P,Zs=new P,Bl=new we,Ma=new we,kl=new we;class el extends Pt{constructor(e=new Yr){if(super(),this.isSprite=!0,this.type="Sprite",kn===void 0){kn=new it;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Gu(t,5);kn.setIndex([0,1,2,0,2,3]),kn.setAttribute("position",new Vr(i,3,0,!1)),kn.setAttribute("uv",new Vr(i,2,3,!1))}this.geometry=kn,this.material=e,this.center=new we(.5,.5),this.count=1}raycast(e,t){e.camera===null&&$e('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),zn.setFromMatrixScale(this.matrixWorld),oh.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Hn.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&zn.multiplyScalar(-Hn.z);const i=this.material.rotation;let n,r;i!==0&&(r=Math.cos(i),n=Math.sin(i));const a=this.center;Js(Ks.set(-.5,-.5,0),Hn,a,zn,n,r),Js(xs.set(.5,-.5,0),Hn,a,zn,n,r),Js(Zs.set(.5,.5,0),Hn,a,zn,n,r),Bl.set(0,0),Ma.set(1,0),kl.set(1,1);let o=e.ray.intersectTriangle(Ks,xs,Zs,!1,gs);if(o===null&&(Js(xs.set(-.5,.5,0),Hn,a,zn,n,r),Ma.set(0,1),o=e.ray.intersectTriangle(Ks,Zs,xs,!1,gs),o===null))return;const c=e.ray.origin.distanceTo(gs);c<e.near||c>e.far||t.push({distance:c,point:gs.clone(),uv:ci.getInterpolation(gs,Ks,xs,Zs,Bl,Ma,kl,new we),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Js(s,e,t,i,n,r){Vn.subVectors(s,t).addScalar(.5).multiply(i),n!==void 0?(vs.x=r*Vn.x-n*Vn.y,vs.y=n*Vn.x+r*Vn.y):vs.copy(Vn),s.copy(e),s.x+=vs.x,s.y+=vs.y,s.applyMatrix4(oh)}const Ni=new P,ba=new P,Qs=new P,Qi=new P,Ea=new P,js=new P,Ta=new P;class tl{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ni)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Ni.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ni.copy(this.origin).addScaledVector(this.direction,t),Ni.distanceToSquared(e))}distanceSqToSegment(e,t,i,n){ba.copy(e).add(t).multiplyScalar(.5),Qs.copy(t).sub(e).normalize(),Qi.copy(this.origin).sub(ba);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Qs),o=Qi.dot(this.direction),c=-Qi.dot(Qs),l=Qi.lengthSq(),h=Math.abs(1-a*a);let p,u,m,g;if(h>0)if(p=a*c-o,u=a*o-c,g=r*h,p>=0)if(u>=-g)if(u<=g){const x=1/h;p*=x,u*=x,m=p*(p+a*u+2*o)+u*(a*p+u+2*c)+l}else u=r,p=Math.max(0,-(a*u+o)),m=-p*p+u*(u+2*c)+l;else u=-r,p=Math.max(0,-(a*u+o)),m=-p*p+u*(u+2*c)+l;else u<=-g?(p=Math.max(0,-(-a*r+o)),u=p>0?-r:Math.min(Math.max(-r,-c),r),m=-p*p+u*(u+2*c)+l):u<=g?(p=0,u=Math.min(Math.max(-r,-c),r),m=u*(u+2*c)+l):(p=Math.max(0,-(a*r+o)),u=p>0?r:Math.min(Math.max(-r,-c),r),m=-p*p+u*(u+2*c)+l);else u=a>0?-r:r,p=Math.max(0,-(a*u+o)),m=-p*p+u*(u+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,p),n&&n.copy(ba).addScaledVector(Qs,u),m}intersectSphere(e,t){Ni.subVectors(e.center,this.origin);const i=Ni.dot(this.direction),n=Ni.dot(Ni)-i*i,r=e.radius*e.radius;if(n>r)return null;const a=Math.sqrt(r-n),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,n,r,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,p=1/this.direction.z,u=this.origin;return l>=0?(i=(e.min.x-u.x)*l,n=(e.max.x-u.x)*l):(i=(e.max.x-u.x)*l,n=(e.min.x-u.x)*l),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),i>a||r>n||((r>i||isNaN(i))&&(i=r),(a<n||isNaN(n))&&(n=a),p>=0?(o=(e.min.z-u.z)*p,c=(e.max.z-u.z)*p):(o=(e.max.z-u.z)*p,c=(e.min.z-u.z)*p),i>c||o>n)||((o>i||i!==i)&&(i=o),(c<n||n!==n)&&(n=c),n<0)?null:this.at(i>=0?i:n,t)}intersectsBox(e){return this.intersectBox(e,Ni)!==null}intersectTriangle(e,t,i,n,r){Ea.subVectors(t,e),js.subVectors(i,e),Ta.crossVectors(Ea,js);let a=this.direction.dot(Ta),o;if(a>0){if(n)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Qi.subVectors(this.origin,e);const c=o*this.direction.dot(js.crossVectors(Qi,js));if(c<0)return null;const l=o*this.direction.dot(Ea.cross(Qi));if(l<0||c+l>a)return null;const h=-o*Qi.dot(Ta);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Vi extends an{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new te(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rn,this.combine=Hc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const zl=new at,hn=new tl,er=new ui,Hl=new P,tr=new P,ir=new P,nr=new P,wa=new P,sr=new P,Vl=new P,rr=new P;class rt extends Pt{constructor(e=new it,t=new Vi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){const o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,n=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(n,e);const o=this.morphTargetInfluences;if(r&&o){sr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=o[c],p=r[c];h!==0&&(wa.fromBufferAttribute(p,e),a?sr.addScaledVector(wa,h):sr.addScaledVector(wa.sub(t),h))}t.add(sr)}return t}raycast(e,t){const i=this.geometry,n=this.material,r=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),er.copy(i.boundingSphere),er.applyMatrix4(r),hn.copy(e.ray).recast(e.near),!(er.containsPoint(hn.origin)===!1&&(hn.intersectSphere(er,Hl)===null||hn.origin.distanceToSquared(Hl)>(e.far-e.near)**2))&&(zl.copy(r).invert(),hn.copy(e.ray).applyMatrix4(zl),!(i.boundingBox!==null&&hn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,hn)))}_computeIntersections(e,t,i){let n;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,p=r.attributes.normal,u=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=u.length;g<x;g++){const f=u[g],d=a[f.materialIndex],T=Math.max(f.start,m.start),E=Math.min(o.count,Math.min(f.start+f.count,m.start+m.count));for(let S=T,M=E;S<M;S+=3){const b=o.getX(S),R=o.getX(S+1),_=o.getX(S+2);n=ar(this,d,e,i,l,h,p,b,R,_),n&&(n.faceIndex=Math.floor(S/3),n.face.materialIndex=f.materialIndex,t.push(n))}}else{const g=Math.max(0,m.start),x=Math.min(o.count,m.start+m.count);for(let f=g,d=x;f<d;f+=3){const T=o.getX(f),E=o.getX(f+1),S=o.getX(f+2);n=ar(this,a,e,i,l,h,p,T,E,S),n&&(n.faceIndex=Math.floor(f/3),t.push(n))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,x=u.length;g<x;g++){const f=u[g],d=a[f.materialIndex],T=Math.max(f.start,m.start),E=Math.min(c.count,Math.min(f.start+f.count,m.start+m.count));for(let S=T,M=E;S<M;S+=3){const b=S,R=S+1,_=S+2;n=ar(this,d,e,i,l,h,p,b,R,_),n&&(n.faceIndex=Math.floor(S/3),n.face.materialIndex=f.materialIndex,t.push(n))}}else{const g=Math.max(0,m.start),x=Math.min(c.count,m.start+m.count);for(let f=g,d=x;f<d;f+=3){const T=f,E=f+1,S=f+2;n=ar(this,a,e,i,l,h,p,T,E,S),n&&(n.faceIndex=Math.floor(f/3),t.push(n))}}}}function Xu(s,e,t,i,n,r,a,o){let c;if(e.side===$t?c=i.intersectTriangle(a,r,n,!0,o):c=i.intersectTriangle(n,r,a,e.side===ki,o),c===null)return null;rr.copy(o),rr.applyMatrix4(s.matrixWorld);const l=t.ray.origin.distanceTo(rr);return l<t.near||l>t.far?null:{distance:l,point:rr.clone(),object:s}}function ar(s,e,t,i,n,r,a,o,c,l){s.getVertexPosition(o,tr),s.getVertexPosition(c,ir),s.getVertexPosition(l,nr);const h=Xu(s,e,t,i,tr,ir,nr,Vl);if(h){const p=new P;ci.getBarycoord(Vl,tr,ir,nr,p),n&&(h.uv=ci.getInterpolatedAttribute(n,o,c,l,p,new we)),r&&(h.uv1=ci.getInterpolatedAttribute(r,o,c,l,p,new we)),a&&(h.normal=ci.getInterpolatedAttribute(a,o,c,l,p,new P),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new P,materialIndex:0};ci.getNormal(tr,ir,nr,u.normal),h.face=u,h.barycoord=p}return h}class lh extends Wt{constructor(e=null,t=1,i=1,n,r,a,o,c,l=Ft,h=Ft,p,u){super(null,a,o,c,l,h,n,r,p,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Gl extends Ie{constructor(e,t,i,n=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Gn=new at,Wl=new at,or=[],Xl=new En,qu=new at,_s=new rt,Ss=new ui;class Yu extends rt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Gl(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let n=0;n<i;n++)this.setMatrixAt(n,qu)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new En),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Gn),Xl.copy(e.boundingBox).applyMatrix4(Gn),this.boundingBox.union(Xl)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ui),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Gn),Ss.copy(e.boundingSphere).applyMatrix4(Gn),this.boundingSphere.union(Ss)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,n=this.morphTexture.source.data.data,r=i.length+1,a=e*r+1;for(let o=0;o<i.length;o++)i[o]=n[a+o]}raycast(e,t){const i=this.matrixWorld,n=this.count;if(_s.geometry=this.geometry,_s.material=this.material,_s.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ss.copy(this.boundingSphere),Ss.applyMatrix4(i),e.ray.intersectsSphere(Ss)!==!1))for(let r=0;r<n;r++){this.getMatrixAt(r,Gn),Wl.multiplyMatrices(i,Gn),_s.matrixWorld=Wl,_s.raycast(e,or);for(let a=0,o=or.length;a<o;a++){const c=or[a];c.instanceId=r,c.object=this,t.push(c)}or.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Gl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const i=t.morphTargetInfluences,n=i.length+1;this.morphTexture===null&&(this.morphTexture=new lh(new Float32Array(n*this.count),n,this.count,qo,mi));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<i.length;l++)a+=i[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=n*e;return r[c]=o,r.set(i,c+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Aa=new P,$u=new P,Ku=new Oe;class pn{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,n){return this.normal.set(e,t,i),this.constant=n,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const n=Aa.subVectors(i,t).cross($u.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(n,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const n=e.delta(Aa),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(n,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Ku.getNormalMatrix(e),n=this.coplanarPoint(Aa).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const un=new ui,Zu=new we(.5,.5),lr=new P;class il{constructor(e=new pn,t=new pn,i=new pn,n=new pn,r=new pn,a=new pn){this.planes=[e,t,i,n,r,a]}set(e,t,i,n,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(n),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=wi,i=!1){const n=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],p=r[5],u=r[6],m=r[7],g=r[8],x=r[9],f=r[10],d=r[11],T=r[12],E=r[13],S=r[14],M=r[15];if(n[0].setComponents(l-a,m-h,d-g,M-T).normalize(),n[1].setComponents(l+a,m+h,d+g,M+T).normalize(),n[2].setComponents(l+o,m+p,d+x,M+E).normalize(),n[3].setComponents(l-o,m-p,d-x,M-E).normalize(),i)n[4].setComponents(c,u,f,S).normalize(),n[5].setComponents(l-c,m-u,d-f,M-S).normalize();else if(n[4].setComponents(l-c,m-u,d-f,M-S).normalize(),t===wi)n[5].setComponents(l+c,m+u,d+f,M+S).normalize();else if(t===Ns)n[5].setComponents(c,u,f,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),un.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),un.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(un)}intersectsSprite(e){un.center.set(0,0,0);const t=Zu.distanceTo(e.center);return un.radius=.7071067811865476+t,un.applyMatrix4(e.matrixWorld),this.intersectsSphere(un)}intersectsSphere(e){const t=this.planes,i=e.center,n=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<n)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const n=t[i];if(lr.x=n.normal.x>0?e.max.x:e.min.x,lr.y=n.normal.y>0?e.max.y:e.min.y,lr.z=n.normal.z>0?e.max.z:e.min.z,n.distanceToPoint(lr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Sn extends an{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new te(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Gr=new P,Wr=new P,ql=new at,ys=new tl,cr=new ui,Ra=new P,Yl=new P;class nl extends Pt{constructor(e=new it,t=new Sn){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let n=1,r=t.count;n<r;n++)Gr.fromBufferAttribute(t,n-1),Wr.fromBufferAttribute(t,n),i[n]=i[n-1],i[n]+=Gr.distanceTo(Wr);e.setAttribute("lineDistance",new ct(i,1))}else Ue("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,n=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),cr.copy(i.boundingSphere),cr.applyMatrix4(n),cr.radius+=r,e.ray.intersectsSphere(cr)===!1)return;ql.copy(n).invert(),ys.copy(e.ray).applyMatrix4(ql);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=i.index,u=i.attributes.position;if(h!==null){const m=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let x=m,f=g-1;x<f;x+=l){const d=h.getX(x),T=h.getX(x+1),E=hr(this,e,ys,c,d,T,x);E&&t.push(E)}if(this.isLineLoop){const x=h.getX(g-1),f=h.getX(m),d=hr(this,e,ys,c,x,f,g-1);d&&t.push(d)}}else{const m=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let x=m,f=g-1;x<f;x+=l){const d=hr(this,e,ys,c,x,x+1,x);d&&t.push(d)}if(this.isLineLoop){const x=hr(this,e,ys,c,g-1,m,g-1);x&&t.push(x)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){const o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function hr(s,e,t,i,n,r,a){const o=s.geometry.attributes.position;if(Gr.fromBufferAttribute(o,n),Wr.fromBufferAttribute(o,r),t.distanceSqToSegment(Gr,Wr,Ra,Yl)>i)return;Ra.applyMatrix4(s.matrixWorld);const l=e.ray.origin.distanceTo(Ra);if(!(l<e.near||l>e.far))return{distance:l,point:Yl.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}const $l=new P,Kl=new P;class ch extends nl{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let n=0,r=t.count;n<r;n+=2)$l.fromBufferAttribute(t,n),Kl.fromBufferAttribute(t,n+1),i[n]=n===0?0:i[n-1],i[n+1]=i[n]+$l.distanceTo(Kl);e.setAttribute("lineDistance",new ct(i,1))}else Ue("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class ur extends nl{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class hh extends an{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new te(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Zl=new at,No=new tl,dr=new ui,fr=new P;class hs extends Pt{constructor(e=new it,t=new hh){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,n=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),dr.copy(i.boundingSphere),dr.applyMatrix4(n),dr.radius+=r,e.ray.intersectsSphere(dr)===!1)return;Zl.copy(n).invert(),No.copy(e.ray).applyMatrix4(Zl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=i.index,p=i.attributes.position;if(l!==null){const u=Math.max(0,a.start),m=Math.min(l.count,a.start+a.count);for(let g=u,x=m;g<x;g++){const f=l.getX(g);fr.fromBufferAttribute(p,f),Jl(fr,f,c,n,e,t,this)}}else{const u=Math.max(0,a.start),m=Math.min(p.count,a.start+a.count);for(let g=u,x=m;g<x;g++)fr.fromBufferAttribute(p,g),Jl(fr,g,c,n,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){const o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Jl(s,e,t,i,n,r,a){const o=No.distanceSqToPoint(s);if(o<t){const c=new P;No.closestPointToPoint(s,c),c.applyMatrix4(i);const l=n.ray.origin.distanceTo(c);if(l<n.near||l>n.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class uh extends Wt{constructor(e=[],t=yn,i,n,r,a,o,c,l,h){super(e,t,i,n,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class as extends Wt{constructor(e,t,i,n,r,a,o,c,l){super(e,t,i,n,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class os extends Wt{constructor(e,t,i=Ci,n,r,a,o=Ft,c=Ft,l,h=zi,p=1){if(h!==zi&&h!==_n)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:p};super(u,n,r,a,o,c,h,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Qo(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Ju extends os{constructor(e,t=Ci,i=yn,n,r,a=Ft,o=Ft,c,l=zi){const h={width:e,height:e,depth:1},p=[h,h,h,h,h,h];super(e,e,t,i,n,r,a,o,c,l),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class dh extends Wt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Os extends it{constructor(e=1,t=1,i=1,n=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:n,heightSegments:r,depthSegments:a};const o=this;n=Math.floor(n),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],h=[],p=[];let u=0,m=0;g("z","y","x",-1,-1,i,t,e,a,r,0),g("z","y","x",1,-1,i,t,-e,a,r,1),g("x","z","y",1,1,e,i,t,n,a,2),g("x","z","y",1,-1,e,i,-t,n,a,3),g("x","y","z",1,-1,e,t,i,n,r,4),g("x","y","z",-1,-1,e,t,-i,n,r,5),this.setIndex(c),this.setAttribute("position",new ct(l,3)),this.setAttribute("normal",new ct(h,3)),this.setAttribute("uv",new ct(p,2));function g(x,f,d,T,E,S,M,b,R,_,w){const L=S/R,C=M/_,I=S/2,H=M/2,X=b/2,F=R+1,W=_+1;let G=0,$=0;const Q=new P;for(let ie=0;ie<W;ie++){const se=ie*C-H;for(let ge=0;ge<F;ge++){const be=ge*L-I;Q[x]=be*T,Q[f]=se*E,Q[d]=X,l.push(Q.x,Q.y,Q.z),Q[x]=0,Q[f]=0,Q[d]=b>0?1:-1,h.push(Q.x,Q.y,Q.z),p.push(ge/R),p.push(1-ie/_),G+=1}}for(let ie=0;ie<_;ie++)for(let se=0;se<R;se++){const ge=u+se+F*ie,be=u+se+F*(ie+1),He=u+(se+1)+F*(ie+1),Ye=u+(se+1)+F*ie;c.push(ge,be,Ye),c.push(be,He,Ye),$+=6}o.addGroup(m,$,w),m+=$,u+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Os(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class sl extends it{constructor(e=1,t=32,i=0,n=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:n},t=Math.max(3,t);const r=[],a=[],o=[],c=[],l=new P,h=new we;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let p=0,u=3;p<=t;p++,u+=3){const m=i+p/t*n;l.x=e*Math.cos(m),l.y=e*Math.sin(m),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[u]/e+1)/2,h.y=(a[u+1]/e+1)/2,c.push(h.x,h.y)}for(let p=1;p<=t;p++)r.push(p,p+1,0);this.setIndex(r),this.setAttribute("position",new ct(a,3)),this.setAttribute("normal",new ct(o,3)),this.setAttribute("uv",new ct(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new sl(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class rl extends it{constructor(e=1,t=1,i=1,n=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:n,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;n=Math.floor(n),r=Math.floor(r);const h=[],p=[],u=[],m=[];let g=0;const x=[],f=i/2;let d=0;T(),a===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new ct(p,3)),this.setAttribute("normal",new ct(u,3)),this.setAttribute("uv",new ct(m,2));function T(){const S=new P,M=new P;let b=0;const R=(t-e)/i;for(let _=0;_<=r;_++){const w=[],L=_/r,C=L*(t-e)+e;for(let I=0;I<=n;I++){const H=I/n,X=H*c+o,F=Math.sin(X),W=Math.cos(X);M.x=C*F,M.y=-L*i+f,M.z=C*W,p.push(M.x,M.y,M.z),S.set(F,R,W).normalize(),u.push(S.x,S.y,S.z),m.push(H,1-L),w.push(g++)}x.push(w)}for(let _=0;_<n;_++)for(let w=0;w<r;w++){const L=x[w][_],C=x[w+1][_],I=x[w+1][_+1],H=x[w][_+1];(e>0||w!==0)&&(h.push(L,C,H),b+=3),(t>0||w!==r-1)&&(h.push(C,I,H),b+=3)}l.addGroup(d,b,0),d+=b}function E(S){const M=g,b=new we,R=new P;let _=0;const w=S===!0?e:t,L=S===!0?1:-1;for(let I=1;I<=n;I++)p.push(0,f*L,0),u.push(0,L,0),m.push(.5,.5),g++;const C=g;for(let I=0;I<=n;I++){const X=I/n*c+o,F=Math.cos(X),W=Math.sin(X);R.x=w*W,R.y=f*L,R.z=w*F,p.push(R.x,R.y,R.z),u.push(0,L,0),b.x=F*.5+.5,b.y=W*.5*L+.5,m.push(b.x,b.y),g++}for(let I=0;I<n;I++){const H=M+I,X=C+I;S===!0?h.push(X,X+1,H):h.push(X+1,X,H),_+=3}l.addGroup(d,_,S===!0?1:2),d+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new rl(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Fs extends it{constructor(e=1,t=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:n};const r=e/2,a=t/2,o=Math.floor(i),c=Math.floor(n),l=o+1,h=c+1,p=e/o,u=t/c,m=[],g=[],x=[],f=[];for(let d=0;d<h;d++){const T=d*u-a;for(let E=0;E<l;E++){const S=E*p-r;g.push(S,-T,0),x.push(0,0,1),f.push(E/o),f.push(1-d/c)}}for(let d=0;d<c;d++)for(let T=0;T<o;T++){const E=T+l*d,S=T+l*(d+1),M=T+1+l*(d+1),b=T+1+l*d;m.push(E,S,b),m.push(S,M,b)}this.setIndex(m),this.setAttribute("position",new ct(g,3)),this.setAttribute("normal",new ct(x,3)),this.setAttribute("uv",new ct(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fs(e.width,e.height,e.widthSegments,e.heightSegments)}}class Gi extends it{constructor(e=.5,t=1,i=32,n=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:n,thetaStart:r,thetaLength:a},i=Math.max(3,i),n=Math.max(1,n);const o=[],c=[],l=[],h=[];let p=e;const u=(t-e)/n,m=new P,g=new we;for(let x=0;x<=n;x++){for(let f=0;f<=i;f++){const d=r+f/i*a;m.x=p*Math.cos(d),m.y=p*Math.sin(d),c.push(m.x,m.y,m.z),l.push(0,0,1),g.x=(m.x/t+1)/2,g.y=(m.y/t+1)/2,h.push(g.x,g.y)}p+=u}for(let x=0;x<n;x++){const f=x*(i+1);for(let d=0;d<i;d++){const T=d+f,E=T,S=T+i+1,M=T+i+2,b=T+1;o.push(E,S,b),o.push(S,M,b)}}this.setIndex(o),this.setAttribute("position",new ct(c,3)),this.setAttribute("normal",new ct(l,3)),this.setAttribute("uv",new ct(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gi(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Bi extends it{constructor(e=1,t=32,i=16,n=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:n,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const c=Math.min(a+o,Math.PI);let l=0;const h=[],p=new P,u=new P,m=[],g=[],x=[],f=[];for(let d=0;d<=i;d++){const T=[],E=d/i,S=a+E*o,M=e*Math.cos(S),b=Math.sqrt(e*e-M*M);let R=0;d===0&&a===0?R=.5/t:d===i&&c===Math.PI&&(R=-.5/t);for(let _=0;_<=t;_++){const w=_/t,L=n+w*r;p.x=-b*Math.cos(L),p.y=M,p.z=b*Math.sin(L),g.push(p.x,p.y,p.z),u.copy(p).normalize(),x.push(u.x,u.y,u.z),f.push(w+R,1-E),T.push(l++)}h.push(T)}for(let d=0;d<i;d++)for(let T=0;T<t;T++){const E=h[d][T+1],S=h[d][T],M=h[d+1][T],b=h[d+1][T+1];(d!==0||a>0)&&m.push(E,S,b),(d!==i-1||c<Math.PI)&&m.push(S,M,b)}this.setIndex(m),this.setAttribute("position",new ct(g,3)),this.setAttribute("normal",new ct(x,3)),this.setAttribute("uv",new ct(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bi(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class al extends it{constructor(e=1,t=.4,i=12,n=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:n,arc:r,thetaStart:a,thetaLength:o},i=Math.floor(i),n=Math.floor(n);const c=[],l=[],h=[],p=[],u=new P,m=new P,g=new P;for(let x=0;x<=i;x++){const f=a+x/i*o;for(let d=0;d<=n;d++){const T=d/n*r;m.x=(e+t*Math.cos(f))*Math.cos(T),m.y=(e+t*Math.cos(f))*Math.sin(T),m.z=t*Math.sin(f),l.push(m.x,m.y,m.z),u.x=e*Math.cos(T),u.y=e*Math.sin(T),g.subVectors(m,u).normalize(),h.push(g.x,g.y,g.z),p.push(d/n),p.push(x/i)}}for(let x=1;x<=i;x++)for(let f=1;f<=n;f++){const d=(n+1)*x+f-1,T=(n+1)*(x-1)+f-1,E=(n+1)*(x-1)+f,S=(n+1)*x+f;c.push(d,T,S),c.push(T,E,S)}this.setIndex(c),this.setAttribute("position",new ct(l,3)),this.setAttribute("normal",new ct(h,3)),this.setAttribute("uv",new ct(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new al(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}function ls(s){const e={};for(const t in s){e[t]={};for(const i in s[t]){const n=s[t][i];if(Ql(n))n.isRenderTargetTexture?(Ue("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=n.clone();else if(Array.isArray(n))if(Ql(n[0])){const r=[];for(let a=0,o=n.length;a<o;a++)r[a]=n[a].clone();e[t][i]=r}else e[t][i]=n.slice();else e[t][i]=n}}return e}function Yt(s){const e={};for(let t=0;t<s.length;t++){const i=ls(s[t]);for(const n in i)e[n]=i[n]}return e}function Ql(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function Qu(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function fh(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Xe.workingColorSpace}const Xr={clone:ls,merge:Yt};var ju=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ed=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class et extends an{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ju,this.fragmentShader=ed,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ls(e.uniforms),this.uniformsGroups=Qu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const n in this.uniforms){const a=this.uniforms[n].value;a&&a.isTexture?t.uniforms[n]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[n]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[n]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[n]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[n]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[n]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[n]={type:"m4",value:a.toArray()}:t.uniforms[n]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const n=e.uniforms[i];switch(this.uniforms[i]={},n.type){case"t":this.uniforms[i].value=t[n.value]||null;break;case"c":this.uniforms[i].value=new te().setHex(n.value);break;case"v2":this.uniforms[i].value=new we().fromArray(n.value);break;case"v3":this.uniforms[i].value=new P().fromArray(n.value);break;case"v4":this.uniforms[i].value=new dt().fromArray(n.value);break;case"m3":this.uniforms[i].value=new Oe().fromArray(n.value);break;case"m4":this.uniforms[i].value=new at().fromArray(n.value);break;default:this.uniforms[i].value=n.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class td extends et{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class jl extends an{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new te(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new te(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Lo,this.normalScale=new we(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class id extends an{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=du,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class nd extends an{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class ph extends Pt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new te(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const Ca=new at,ec=new P,tc=new P;class sd{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new we(512,512),this.mapType=si,this.map=null,this.mapPass=null,this.matrix=new at,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new il,this._frameExtents=new we(1,1),this._viewportCount=1,this._viewports=[new dt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;ec.setFromMatrixPosition(e.matrixWorld),t.position.copy(ec),tc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(tc),t.updateMatrixWorld(),Ca.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ca,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Ns||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Ca)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const pr=new P,mr=new Hi,Si=new P;class mh extends Pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new at,this.projectionMatrix=new at,this.projectionMatrixInverse=new at,this.coordinateSystem=wi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(pr,mr,Si),Si.x===1&&Si.y===1&&Si.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(pr,mr,Si.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(pr,mr,Si),Si.x===1&&Si.y===1&&Si.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(pr,mr,Si.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ji=new P,ic=new we,nc=new we;class ni extends mh{constructor(e=50,t=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Do*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(na*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Do*2*Math.atan(Math.tan(na*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){ji.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ji.x,ji.y).multiplyScalar(-e/ji.z),ji.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ji.x,ji.y).multiplyScalar(-e/ji.z)}getViewSize(e,t){return this.getViewBounds(e,ic,nc),t.subVectors(nc,ic)}setViewOffset(e,t,i,n,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(na*.5*this.fov)/this.zoom,i=2*t,n=this.aspect*i,r=-.5*n;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*n/c,t-=a.offsetY*i/l,n*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+n,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class rd extends sd{constructor(){super(new ni(90,1,.5,500)),this.isPointLightShadow=!0}}class Uo extends ph{constructor(e,t,i=0,n=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=n,this.shadow=new rd}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class ol extends mh{constructor(e=-1,t=1,i=1,n=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=n,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,n,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=n+t,c=n-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class ad extends ph{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const Wn=-90,Xn=1;class od extends Pt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const n=new ni(Wn,Xn,e,t);n.layers=this.layers,this.add(n);const r=new ni(Wn,Xn,e,t);r.layers=this.layers,this.add(r);const a=new ni(Wn,Xn,e,t);a.layers=this.layers,this.add(a);const o=new ni(Wn,Xn,e,t);o.layers=this.layers,this.add(o);const c=new ni(Wn,Xn,e,t);c.layers=this.layers,this.add(c);const l=new ni(Wn,Xn,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,n,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===wi)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ns)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,h]=this.children,p=e.getRenderTarget(),u=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let f=!1;e.isWebGLRenderer===!0?f=e.state.buffers.depth.getReversed():f=e.reversedDepthBuffer,e.setRenderTarget(i,0,n),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,n),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,n),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,n),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,n),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,n),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(p,u,m),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class ld extends ni{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class cd{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=hd.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function hd(){this._document.hidden===!1&&this.reset()}class gh{static{gh.prototype.isMatrix2=!0}constructor(e,t,i,n){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,n)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,n){const r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=n,this}}function sc(s,e,t,i){const n=ud(i);switch(t){case jc:return s*e;case qo:return s*e/n.components*n.byteLength;case Yo:return s*e/n.components*n.byteLength;case Mn:return s*e*2/n.components*n.byteLength;case $o:return s*e*2/n.components*n.byteLength;case eh:return s*e*3/n.components*n.byteLength;case gi:return s*e*4/n.components*n.byteLength;case Ko:return s*e*4/n.components*n.byteLength;case Rr:case Cr:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Pr:case Lr:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case to:case no:return Math.max(s,16)*Math.max(e,8)/4;case eo:case io:return Math.max(s,8)*Math.max(e,8)/2;case so:case ro:case oo:case lo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case ao:case Or:case co:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case ho:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case uo:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case fo:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case po:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case mo:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case go:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case vo:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case xo:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case _o:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case So:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case yo:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Mo:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case bo:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case Eo:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case To:case wo:case Ao:return Math.ceil(s/4)*Math.ceil(e/4)*16;case Ro:case Co:return Math.ceil(s/4)*Math.ceil(e/4)*8;case Fr:case Po:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function ud(s){switch(s){case si:case Kc:return{byteLength:1,components:1};case Is:case Zc:case ri:return{byteLength:2,components:1};case Wo:case Xo:return{byteLength:2,components:4};case Ci:case Go:case mi:return{byteLength:4,components:1};case Jc:case Qc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ho}}));typeof window<"u"&&(window.__THREE__?Ue("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ho);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function vh(){let s=null,e=!1,t=null,i=null;function n(r,a){t(r,a),i=s.requestAnimationFrame(n)}return{start:function(){e!==!0&&t!==null&&s!==null&&(i=s.requestAnimationFrame(n),e=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function dd(s){const e=new WeakMap;function t(o,c){const l=o.array,h=o.usage,p=l.byteLength,u=s.createBuffer();s.bindBuffer(c,u),s.bufferData(c,l,h),o.onUploadCallback();let m;if(l instanceof Float32Array)m=s.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)m=s.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?m=s.HALF_FLOAT:m=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=s.SHORT;else if(l instanceof Uint32Array)m=s.UNSIGNED_INT;else if(l instanceof Int32Array)m=s.INT;else if(l instanceof Int8Array)m=s.BYTE;else if(l instanceof Uint8Array)m=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:p}}function i(o,c,l){const h=c.array,p=c.updateRanges;if(s.bindBuffer(l,o),p.length===0)s.bufferSubData(l,0,h);else{p.sort((m,g)=>m.start-g.start);let u=0;for(let m=1;m<p.length;m++){const g=p[u],x=p[m];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++u,p[u]=x)}p.length=u+1;for(let m=0,g=p.length;m<g;m++){const x=p[m];s.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function n(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(s.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:n,remove:r,update:a}}var fd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,pd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,md=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,gd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,vd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,xd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,_d=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Sd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,yd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Md=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,bd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ed=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Td=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,wd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Ad=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Rd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Cd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Pd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ld=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Id=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Dd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Nd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Ud=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Od=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Fd=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Bd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,kd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,zd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Hd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Vd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Gd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Wd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Xd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,qd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Yd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,$d=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Kd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Zd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Jd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Qd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,jd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ef=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,tf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,nf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,sf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,rf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,af=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,of=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,cf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,hf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,uf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,df=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,ff=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,pf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,mf=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,gf=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,vf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,xf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_f=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,yf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Mf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,bf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Ef=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Tf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,wf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Af=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Rf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Cf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Pf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Lf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,If=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Df=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Nf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Uf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Of=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Ff=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Bf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,kf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,zf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Hf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Vf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Gf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Wf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Xf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,qf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Yf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,$f=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Kf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Zf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Jf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Qf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,jf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,ep=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,tp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,ip=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,np=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,sp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,rp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ap=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,op=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,lp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,cp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,hp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,up=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,dp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,fp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const pp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,mp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_p=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,yp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Mp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,bp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Ep=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Tp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ap=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Rp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Cp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Lp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ip=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Dp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Np=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Up=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Op=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Fp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,kp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Hp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Gp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Wp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Xp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,qp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Yp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ke={alphahash_fragment:fd,alphahash_pars_fragment:pd,alphamap_fragment:md,alphamap_pars_fragment:gd,alphatest_fragment:vd,alphatest_pars_fragment:xd,aomap_fragment:_d,aomap_pars_fragment:Sd,batching_pars_vertex:yd,batching_vertex:Md,begin_vertex:bd,beginnormal_vertex:Ed,bsdfs:Td,iridescence_fragment:wd,bumpmap_pars_fragment:Ad,clipping_planes_fragment:Rd,clipping_planes_pars_fragment:Cd,clipping_planes_pars_vertex:Pd,clipping_planes_vertex:Ld,color_fragment:Id,color_pars_fragment:Dd,color_pars_vertex:Nd,color_vertex:Ud,common:Od,cube_uv_reflection_fragment:Fd,defaultnormal_vertex:Bd,displacementmap_pars_vertex:kd,displacementmap_vertex:zd,emissivemap_fragment:Hd,emissivemap_pars_fragment:Vd,colorspace_fragment:Gd,colorspace_pars_fragment:Wd,envmap_fragment:Xd,envmap_common_pars_fragment:qd,envmap_pars_fragment:Yd,envmap_pars_vertex:$d,envmap_physical_pars_fragment:af,envmap_vertex:Kd,fog_vertex:Zd,fog_pars_vertex:Jd,fog_fragment:Qd,fog_pars_fragment:jd,gradientmap_pars_fragment:ef,lightmap_pars_fragment:tf,lights_lambert_fragment:nf,lights_lambert_pars_fragment:sf,lights_pars_begin:rf,lights_toon_fragment:of,lights_toon_pars_fragment:lf,lights_phong_fragment:cf,lights_phong_pars_fragment:hf,lights_physical_fragment:uf,lights_physical_pars_fragment:df,lights_fragment_begin:ff,lights_fragment_maps:pf,lights_fragment_end:mf,lightprobes_pars_fragment:gf,logdepthbuf_fragment:vf,logdepthbuf_pars_fragment:xf,logdepthbuf_pars_vertex:_f,logdepthbuf_vertex:Sf,map_fragment:yf,map_pars_fragment:Mf,map_particle_fragment:bf,map_particle_pars_fragment:Ef,metalnessmap_fragment:Tf,metalnessmap_pars_fragment:wf,morphinstance_vertex:Af,morphcolor_vertex:Rf,morphnormal_vertex:Cf,morphtarget_pars_vertex:Pf,morphtarget_vertex:Lf,normal_fragment_begin:If,normal_fragment_maps:Df,normal_pars_fragment:Nf,normal_pars_vertex:Uf,normal_vertex:Of,normalmap_pars_fragment:Ff,clearcoat_normal_fragment_begin:Bf,clearcoat_normal_fragment_maps:kf,clearcoat_pars_fragment:zf,iridescence_pars_fragment:Hf,opaque_fragment:Vf,packing:Gf,premultiplied_alpha_fragment:Wf,project_vertex:Xf,dithering_fragment:qf,dithering_pars_fragment:Yf,roughnessmap_fragment:$f,roughnessmap_pars_fragment:Kf,shadowmap_pars_fragment:Zf,shadowmap_pars_vertex:Jf,shadowmap_vertex:Qf,shadowmask_pars_fragment:jf,skinbase_vertex:ep,skinning_pars_vertex:tp,skinning_vertex:ip,skinnormal_vertex:np,specularmap_fragment:sp,specularmap_pars_fragment:rp,tonemapping_fragment:ap,tonemapping_pars_fragment:op,transmission_fragment:lp,transmission_pars_fragment:cp,uv_pars_fragment:hp,uv_pars_vertex:up,uv_vertex:dp,worldpos_vertex:fp,background_vert:pp,background_frag:mp,backgroundCube_vert:gp,backgroundCube_frag:vp,cube_vert:xp,cube_frag:_p,depth_vert:Sp,depth_frag:yp,distance_vert:Mp,distance_frag:bp,equirect_vert:Ep,equirect_frag:Tp,linedashed_vert:wp,linedashed_frag:Ap,meshbasic_vert:Rp,meshbasic_frag:Cp,meshlambert_vert:Pp,meshlambert_frag:Lp,meshmatcap_vert:Ip,meshmatcap_frag:Dp,meshnormal_vert:Np,meshnormal_frag:Up,meshphong_vert:Op,meshphong_frag:Fp,meshphysical_vert:Bp,meshphysical_frag:kp,meshtoon_vert:zp,meshtoon_frag:Hp,points_vert:Vp,points_frag:Gp,shadow_vert:Wp,shadow_frag:Xp,sprite_vert:qp,sprite_frag:Yp},de={common:{diffuse:{value:new te(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Oe}},envmap:{envMap:{value:null},envMapRotation:{value:new Oe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Oe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Oe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Oe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Oe},normalScale:{value:new we(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Oe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Oe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Oe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Oe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new te(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new P},probesMax:{value:new P},probesResolution:{value:new P}},points:{diffuse:{value:new te(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0},uvTransform:{value:new Oe}},sprite:{diffuse:{value:new te(16777215)},opacity:{value:1},center:{value:new we(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}}},bi={basic:{uniforms:Yt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.fog]),vertexShader:ke.meshbasic_vert,fragmentShader:ke.meshbasic_frag},lambert:{uniforms:Yt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new te(0)},envMapIntensity:{value:1}}]),vertexShader:ke.meshlambert_vert,fragmentShader:ke.meshlambert_frag},phong:{uniforms:Yt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new te(0)},specular:{value:new te(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ke.meshphong_vert,fragmentShader:ke.meshphong_frag},standard:{uniforms:Yt([de.common,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.roughnessmap,de.metalnessmap,de.fog,de.lights,{emissive:{value:new te(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag},toon:{uniforms:Yt([de.common,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.gradientmap,de.fog,de.lights,{emissive:{value:new te(0)}}]),vertexShader:ke.meshtoon_vert,fragmentShader:ke.meshtoon_frag},matcap:{uniforms:Yt([de.common,de.bumpmap,de.normalmap,de.displacementmap,de.fog,{matcap:{value:null}}]),vertexShader:ke.meshmatcap_vert,fragmentShader:ke.meshmatcap_frag},points:{uniforms:Yt([de.points,de.fog]),vertexShader:ke.points_vert,fragmentShader:ke.points_frag},dashed:{uniforms:Yt([de.common,de.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ke.linedashed_vert,fragmentShader:ke.linedashed_frag},depth:{uniforms:Yt([de.common,de.displacementmap]),vertexShader:ke.depth_vert,fragmentShader:ke.depth_frag},normal:{uniforms:Yt([de.common,de.bumpmap,de.normalmap,de.displacementmap,{opacity:{value:1}}]),vertexShader:ke.meshnormal_vert,fragmentShader:ke.meshnormal_frag},sprite:{uniforms:Yt([de.sprite,de.fog]),vertexShader:ke.sprite_vert,fragmentShader:ke.sprite_frag},background:{uniforms:{uvTransform:{value:new Oe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ke.background_vert,fragmentShader:ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Oe}},vertexShader:ke.backgroundCube_vert,fragmentShader:ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ke.cube_vert,fragmentShader:ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ke.equirect_vert,fragmentShader:ke.equirect_frag},distance:{uniforms:Yt([de.common,de.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ke.distance_vert,fragmentShader:ke.distance_frag},shadow:{uniforms:Yt([de.lights,de.fog,{color:{value:new te(0)},opacity:{value:1}}]),vertexShader:ke.shadow_vert,fragmentShader:ke.shadow_frag}};bi.physical={uniforms:Yt([bi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Oe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Oe},clearcoatNormalScale:{value:new we(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Oe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Oe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Oe},sheen:{value:0},sheenColor:{value:new te(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Oe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Oe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Oe},transmissionSamplerSize:{value:new we},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Oe},attenuationDistance:{value:0},attenuationColor:{value:new te(0)},specularColor:{value:new te(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Oe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Oe},anisotropyVector:{value:new we},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Oe}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag};const gr={r:0,b:0,g:0},$p=new at,xh=new Oe;xh.set(-1,0,0,0,1,0,0,0,1);function Kp(s,e,t,i,n,r){const a=new te(0);let o=n===!0?0:1,c,l,h=null,p=0,u=null;function m(T){let E=T.isScene===!0?T.background:null;if(E&&E.isTexture){const S=T.backgroundBlurriness>0;E=e.get(E,S)}return E}function g(T){let E=!1;const S=m(T);S===null?f(a,o):S&&S.isColor&&(f(S,1),E=!0);const M=s.xr.getEnvironmentBlendMode();M==="additive"?t.buffers.color.setClear(0,0,0,1,r):M==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(s.autoClear||E)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function x(T,E){const S=m(E);S&&(S.isCubeTexture||S.mapping===qr)?(l===void 0&&(l=new rt(new Os(1,1,1),new et({name:"BackgroundCubeMaterial",uniforms:ls(bi.backgroundCube.uniforms),vertexShader:bi.backgroundCube.vertexShader,fragmentShader:bi.backgroundCube.fragmentShader,side:$t,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(M,b,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=S,l.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4($p.makeRotationFromEuler(E.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(xh),l.material.toneMapped=Xe.getTransfer(S.colorSpace)!==st,(h!==S||p!==S.version||u!==s.toneMapping)&&(l.material.needsUpdate=!0,h=S,p=S.version,u=s.toneMapping),l.layers.enableAll(),T.unshift(l,l.geometry,l.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new rt(new Fs(2,2),new et({name:"BackgroundMaterial",uniforms:ls(bi.background.uniforms),vertexShader:bi.background.vertexShader,fragmentShader:bi.background.fragmentShader,side:ki,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.toneMapped=Xe.getTransfer(S.colorSpace)!==st,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(h!==S||p!==S.version||u!==s.toneMapping)&&(c.material.needsUpdate=!0,h=S,p=S.version,u=s.toneMapping),c.layers.enableAll(),T.unshift(c,c.geometry,c.material,0,0,null))}function f(T,E){T.getRGB(gr,fh(s)),t.buffers.color.setClear(gr.r,gr.g,gr.b,E,r)}function d(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(T,E=1){a.set(T),o=E,f(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(T){o=T,f(a,o)},render:g,addToRenderList:x,dispose:d}}function Zp(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),i={},n=u(null);let r=n,a=!1;function o(C,I,H,X,F){let W=!1;const G=p(C,X,H,I);r!==G&&(r=G,l(r.object)),W=m(C,X,H,F),W&&g(C,X,H,F),F!==null&&e.update(F,s.ELEMENT_ARRAY_BUFFER),(W||a)&&(a=!1,S(C,I,H,X),F!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(F).buffer))}function c(){return s.createVertexArray()}function l(C){return s.bindVertexArray(C)}function h(C){return s.deleteVertexArray(C)}function p(C,I,H,X){const F=X.wireframe===!0;let W=i[I.id];W===void 0&&(W={},i[I.id]=W);const G=C.isInstancedMesh===!0?C.id:0;let $=W[G];$===void 0&&($={},W[G]=$);let Q=$[H.id];Q===void 0&&(Q={},$[H.id]=Q);let ie=Q[F];return ie===void 0&&(ie=u(c()),Q[F]=ie),ie}function u(C){const I=[],H=[],X=[];for(let F=0;F<t;F++)I[F]=0,H[F]=0,X[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:H,attributeDivisors:X,object:C,attributes:{},index:null}}function m(C,I,H,X){const F=r.attributes,W=I.attributes;let G=0;const $=H.getAttributes();for(const Q in $)if($[Q].location>=0){const se=F[Q];let ge=W[Q];if(ge===void 0&&(Q==="instanceMatrix"&&C.instanceMatrix&&(ge=C.instanceMatrix),Q==="instanceColor"&&C.instanceColor&&(ge=C.instanceColor)),se===void 0||se.attribute!==ge||ge&&se.data!==ge.data)return!0;G++}return r.attributesNum!==G||r.index!==X}function g(C,I,H,X){const F={},W=I.attributes;let G=0;const $=H.getAttributes();for(const Q in $)if($[Q].location>=0){let se=W[Q];se===void 0&&(Q==="instanceMatrix"&&C.instanceMatrix&&(se=C.instanceMatrix),Q==="instanceColor"&&C.instanceColor&&(se=C.instanceColor));const ge={};ge.attribute=se,se&&se.data&&(ge.data=se.data),F[Q]=ge,G++}r.attributes=F,r.attributesNum=G,r.index=X}function x(){const C=r.newAttributes;for(let I=0,H=C.length;I<H;I++)C[I]=0}function f(C){d(C,0)}function d(C,I){const H=r.newAttributes,X=r.enabledAttributes,F=r.attributeDivisors;H[C]=1,X[C]===0&&(s.enableVertexAttribArray(C),X[C]=1),F[C]!==I&&(s.vertexAttribDivisor(C,I),F[C]=I)}function T(){const C=r.newAttributes,I=r.enabledAttributes;for(let H=0,X=I.length;H<X;H++)I[H]!==C[H]&&(s.disableVertexAttribArray(H),I[H]=0)}function E(C,I,H,X,F,W,G){G===!0?s.vertexAttribIPointer(C,I,H,F,W):s.vertexAttribPointer(C,I,H,X,F,W)}function S(C,I,H,X){x();const F=X.attributes,W=H.getAttributes(),G=I.defaultAttributeValues;for(const $ in W){const Q=W[$];if(Q.location>=0){let ie=F[$];if(ie===void 0&&($==="instanceMatrix"&&C.instanceMatrix&&(ie=C.instanceMatrix),$==="instanceColor"&&C.instanceColor&&(ie=C.instanceColor)),ie!==void 0){const se=ie.normalized,ge=ie.itemSize,be=e.get(ie);if(be===void 0)continue;const He=be.buffer,Ye=be.type,K=be.bytesPerElement,re=Ye===s.INT||Ye===s.UNSIGNED_INT||ie.gpuType===Go;if(ie.isInterleavedBufferAttribute){const ee=ie.data,Ce=ee.stride,Ne=ie.offset;if(ee.isInstancedInterleavedBuffer){for(let Pe=0;Pe<Q.locationSize;Pe++)d(Q.location+Pe,ee.meshPerAttribute);C.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let Pe=0;Pe<Q.locationSize;Pe++)f(Q.location+Pe);s.bindBuffer(s.ARRAY_BUFFER,He);for(let Pe=0;Pe<Q.locationSize;Pe++)E(Q.location+Pe,ge/Q.locationSize,Ye,se,Ce*K,(Ne+ge/Q.locationSize*Pe)*K,re)}else{if(ie.isInstancedBufferAttribute){for(let ee=0;ee<Q.locationSize;ee++)d(Q.location+ee,ie.meshPerAttribute);C.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let ee=0;ee<Q.locationSize;ee++)f(Q.location+ee);s.bindBuffer(s.ARRAY_BUFFER,He);for(let ee=0;ee<Q.locationSize;ee++)E(Q.location+ee,ge/Q.locationSize,Ye,se,ge*K,ge/Q.locationSize*ee*K,re)}}else if(G!==void 0){const se=G[$];if(se!==void 0)switch(se.length){case 2:s.vertexAttrib2fv(Q.location,se);break;case 3:s.vertexAttrib3fv(Q.location,se);break;case 4:s.vertexAttrib4fv(Q.location,se);break;default:s.vertexAttrib1fv(Q.location,se)}}}}T()}function M(){w();for(const C in i){const I=i[C];for(const H in I){const X=I[H];for(const F in X){const W=X[F];for(const G in W)h(W[G].object),delete W[G];delete X[F]}}delete i[C]}}function b(C){if(i[C.id]===void 0)return;const I=i[C.id];for(const H in I){const X=I[H];for(const F in X){const W=X[F];for(const G in W)h(W[G].object),delete W[G];delete X[F]}}delete i[C.id]}function R(C){for(const I in i){const H=i[I];for(const X in H){const F=H[X];if(F[C.id]===void 0)continue;const W=F[C.id];for(const G in W)h(W[G].object),delete W[G];delete F[C.id]}}}function _(C){for(const I in i){const H=i[I],X=C.isInstancedMesh===!0?C.id:0,F=H[X];if(F!==void 0){for(const W in F){const G=F[W];for(const $ in G)h(G[$].object),delete G[$];delete F[W]}delete H[X],Object.keys(H).length===0&&delete i[I]}}}function w(){L(),a=!0,r!==n&&(r=n,l(r.object))}function L(){n.geometry=null,n.program=null,n.wireframe=!1}return{setup:o,reset:w,resetDefaultState:L,dispose:M,releaseStatesOfGeometry:b,releaseStatesOfObject:_,releaseStatesOfProgram:R,initAttributes:x,enableAttribute:f,disableUnusedAttributes:T}}function Jp(s,e,t){let i;function n(c){i=c}function r(c,l){s.drawArrays(i,c,l),t.update(l,i,1)}function a(c,l,h){h!==0&&(s.drawArraysInstanced(i,c,l,h),t.update(l,i,h))}function o(c,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,h);let u=0;for(let m=0;m<h;m++)u+=l[m];t.update(u,i,1)}this.setMode=n,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Qp(s,e,t,i){let n;function r(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");n=s.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function a(R){return!(R!==gi&&i.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const _=R===ri&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==si&&i.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==mi&&!_)}function c(R){if(R==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(Ue("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const p=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Ue("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const m=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=s.getParameter(s.MAX_TEXTURE_SIZE),f=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),d=s.getParameter(s.MAX_VERTEX_ATTRIBS),T=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),E=s.getParameter(s.MAX_VARYING_VECTORS),S=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),M=s.getParameter(s.MAX_SAMPLES),b=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:p,reversedDepthBuffer:u,maxTextures:m,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:f,maxAttributes:d,maxVertexUniforms:T,maxVaryings:E,maxFragmentUniforms:S,maxSamples:M,samples:b}}function jp(s){const e=this;let t=null,i=0,n=!1,r=!1;const a=new pn,o=new Oe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(p,u){const m=p.length!==0||u||i!==0||n;return n=u,i=p.length,m},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(p,u){t=h(p,u,0)},this.setState=function(p,u,m){const g=p.clippingPlanes,x=p.clipIntersection,f=p.clipShadows,d=s.get(p);if(!n||g===null||g.length===0||r&&!f)r?h(null):l();else{const T=r?0:i,E=T*4;let S=d.clippingState||null;c.value=S,S=h(g,u,E,m);for(let M=0;M!==E;++M)S[M]=t[M];d.clippingState=S,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=T}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(p,u,m,g){const x=p!==null?p.length:0;let f=null;if(x!==0){if(f=c.value,g!==!0||f===null){const d=m+x*4,T=u.matrixWorldInverse;o.getNormalMatrix(T),(f===null||f.length<d)&&(f=new Float32Array(d));for(let E=0,S=m;E!==x;++E,S+=4)a.copy(p[E]).applyMatrix4(T,o),a.normal.toArray(f,S),f[S+3]=a.constant}c.value=f,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,f}}const nn=4,rc=[.125,.215,.35,.446,.526,.582],gn=20,em=256,Ms=new ol,ac=new te;let Pa=null,La=0,Ia=0,Da=!1;const tm=new P;class oc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,n=100,r={}){const{size:a=256,position:o=tm}=r;Pa=this._renderer.getRenderTarget(),La=this._renderer.getActiveCubeFace(),Ia=this._renderer.getActiveMipmapLevel(),Da=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,n,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=hc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=cc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Pa,La,Ia),this._renderer.xr.enabled=Da,e.scissorTest=!1,qn(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===yn||e.mapping===rs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Pa=this._renderer.getRenderTarget(),La=this._renderer.getActiveCubeFace(),Ia=this._renderer.getActiveMipmapLevel(),Da=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Gt,minFilter:Gt,generateMipmaps:!1,type:ri,format:gi,colorSpace:Br,depthBuffer:!1},n=lc(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=lc(e,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=im(r)),this._blurMaterial=sm(r,e,t),this._ggxMaterial=nm(r,e,t)}return n}_compileMaterial(e){const t=new rt(new it,e);this._renderer.compile(t,Ms)}_sceneToCubeUV(e,t,i,n,r){const c=new ni(90,1,t,i),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],p=this._renderer,u=p.autoClear,m=p.toneMapping;p.getClearColor(ac),p.toneMapping=Ri,p.autoClear=!1,p.state.buffers.depth.getReversed()&&(p.setRenderTarget(n),p.clearDepth(),p.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new rt(new Os,new Vi({name:"PMREM.Background",side:$t,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,f=x.material;let d=!1;const T=e.background;T?T.isColor&&(f.color.copy(T),e.background=null,d=!0):(f.color.copy(ac),d=!0);for(let E=0;E<6;E++){const S=E%3;S===0?(c.up.set(0,l[E],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[E],r.y,r.z)):S===1?(c.up.set(0,0,l[E]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[E],r.z)):(c.up.set(0,l[E],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[E]));const M=this._cubeSize;qn(n,S*M,E>2?M:0,M,M),p.setRenderTarget(n),d&&p.render(x,c),p.render(e,c)}p.toneMapping=m,p.autoClear=u,e.background=T}_textureToCubeUV(e,t){const i=this._renderer,n=e.mapping===yn||e.mapping===rs;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=hc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=cc());const r=n?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;qn(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(a,Ms)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const n=this._lodMeshes.length;for(let r=1;r<n;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){const n=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const c=a.uniforms,l=i/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),p=Math.sqrt(l*l-h*h),u=0+l*1.25,m=p*u,{_lodMax:g}=this,x=this._sizeLods[i],f=3*x*(i>g-nn?i-g+nn:0),d=4*(this._cubeSize-x);c.envMap.value=e.texture,c.roughness.value=m,c.mipInt.value=g-t,qn(r,f,d,3*x,2*x),n.setRenderTarget(r),n.render(o,Ms),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=g-i,qn(e,f,d,3*x,2*x),n.setRenderTarget(e),n.render(o,Ms)}_blur(e,t,i,n,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,n,"latitudinal",r),this._halfBlur(a,e,i,i,n,"longitudinal",r)}_halfBlur(e,t,i,n,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&$e("blur direction must be either latitudinal or longitudinal!");const h=3,p=this._lodMeshes[n];p.material=l;const u=l.uniforms,m=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*gn-1),x=r/g,f=isFinite(r)?1+Math.floor(h*x):gn;f>gn&&Ue(`sigmaRadians, ${r}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${gn}`);const d=[];let T=0;for(let R=0;R<gn;++R){const _=R/x,w=Math.exp(-_*_/2);d.push(w),R===0?T+=w:R<f&&(T+=2*w)}for(let R=0;R<d.length;R++)d[R]=d[R]/T;u.envMap.value=e.texture,u.samples.value=f,u.weights.value=d,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:E}=this;u.dTheta.value=g,u.mipInt.value=E-i;const S=this._sizeLods[n],M=3*S*(n>E-nn?n-E+nn:0),b=4*(this._cubeSize-S);qn(t,M,b,3*S,2*S),c.setRenderTarget(t),c.render(p,Ms)}}function im(s){const e=[],t=[],i=[];let n=s;const r=s-nn+1+rc.length;for(let a=0;a<r;a++){const o=Math.pow(2,n);e.push(o);let c=1/o;a>s-nn?c=rc[a-s+nn-1]:a===0&&(c=0),t.push(c);const l=1/(o-2),h=-l,p=1+l,u=[h,h,p,h,p,p,h,h,p,p,h,p],m=6,g=6,x=3,f=2,d=1,T=new Float32Array(x*g*m),E=new Float32Array(f*g*m),S=new Float32Array(d*g*m);for(let b=0;b<m;b++){const R=b%3*2/3-1,_=b>2?0:-1,w=[R,_,0,R+2/3,_,0,R+2/3,_+1,0,R,_,0,R+2/3,_+1,0,R,_+1,0];T.set(w,x*g*b),E.set(u,f*g*b);const L=[b,b,b,b,b,b];S.set(L,d*g*b)}const M=new it;M.setAttribute("position",new Ie(T,x)),M.setAttribute("uv",new Ie(E,f)),M.setAttribute("faceIndex",new Ie(S,d)),i.push(new rt(M,null)),n>nn&&n--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function lc(s,e,t){const i=new Jt(s,e,t);return i.texture.mapping=qr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function qn(s,e,t,i,n){s.viewport.set(e,t,i,n),s.scissor.set(e,t,i,n)}function nm(s,e,t){return new et({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:em,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:$r(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Ai,depthTest:!1,depthWrite:!1})}function sm(s,e,t){const i=new Float32Array(gn),n=new P(0,1,0);return new et({name:"SphericalGaussianBlur",defines:{n:gn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:n}},vertexShader:$r(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ai,depthTest:!1,depthWrite:!1})}function cc(){return new et({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:$r(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ai,depthTest:!1,depthWrite:!1})}function hc(){return new et({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:$r(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ai,depthTest:!1,depthWrite:!1})}function $r(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class _h extends Jt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},n=[i,i,i,i,i,i];this.texture=new uh(n),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},n=new Os(5,5,5),r=new et({name:"CubemapFromEquirect",uniforms:ls(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:$t,blending:Ai});r.uniforms.tEquirect.value=t;const a=new rt(n,r),o=t.minFilter;return t.minFilter===xn&&(t.minFilter=Gt),new od(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,n=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,n);e.setRenderTarget(r)}}function rm(s){let e=new WeakMap,t=new WeakMap,i=null;function n(u,m=!1){return u==null?null:m?a(u):r(u)}function r(u){if(u&&u.isTexture){const m=u.mapping;if(m===ea||m===ta)if(e.has(u)){const g=e.get(u).texture;return o(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const x=new _h(g.height);return x.fromEquirectangularTexture(s,u),e.set(u,x),u.addEventListener("dispose",l),o(x.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const m=u.mapping,g=m===ea||m===ta,x=m===yn||m===rs;if(g||x){let f=t.get(u);const d=f!==void 0?f.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==d)return i===null&&(i=new oc(s)),f=g?i.fromEquirectangular(u,f):i.fromCubemap(u,f),f.texture.pmremVersion=u.pmremVersion,t.set(u,f),f.texture;if(f!==void 0)return f.texture;{const T=u.image;return g&&T&&T.height>0||x&&T&&c(T)?(i===null&&(i=new oc(s)),f=g?i.fromEquirectangular(u):i.fromCubemap(u),f.texture.pmremVersion=u.pmremVersion,t.set(u,f),u.addEventListener("dispose",h),f.texture):null}}}return u}function o(u,m){return m===ea?u.mapping=yn:m===ta&&(u.mapping=rs),u}function c(u){let m=0;const g=6;for(let x=0;x<g;x++)u[x]!==void 0&&m++;return m===g}function l(u){const m=u.target;m.removeEventListener("dispose",l);const g=e.get(m);g!==void 0&&(e.delete(m),g.dispose())}function h(u){const m=u.target;m.removeEventListener("dispose",h);const g=t.get(m);g!==void 0&&(t.delete(m),g.dispose())}function p(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:n,dispose:p}}function am(s){const e={};function t(i){if(e[i]!==void 0)return e[i];const n=s.getExtension(i);return e[i]=n,n}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const n=t(i);return n===null&&ts("WebGLRenderer: "+i+" extension not supported."),n}}}function om(s,e,t,i){const n={},r=new WeakMap;function a(p){const u=p.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete n[u.id];const m=r.get(u);m&&(e.remove(m),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(p,u){return n[u.id]===!0||(u.addEventListener("dispose",a),n[u.id]=!0,t.memory.geometries++),u}function c(p){const u=p.attributes;for(const m in u)e.update(u[m],s.ARRAY_BUFFER)}function l(p){const u=[],m=p.index,g=p.attributes.position;let x=0;if(g===void 0)return;if(m!==null){const T=m.array;x=m.version;for(let E=0,S=T.length;E<S;E+=3){const M=T[E+0],b=T[E+1],R=T[E+2];u.push(M,b,b,R,R,M)}}else{const T=g.array;x=g.version;for(let E=0,S=T.length/3-1;E<S;E+=3){const M=E+0,b=E+1,R=E+2;u.push(M,b,b,R,R,M)}}const f=new(g.count>=65535?ah:rh)(u,1);f.version=x;const d=r.get(p);d&&e.remove(d),r.set(p,f)}function h(p){const u=r.get(p);if(u){const m=p.index;m!==null&&u.version<m.version&&l(p)}else l(p);return r.get(p)}return{get:o,update:c,getWireframeAttribute:h}}function lm(s,e,t){let i;function n(p){i=p}let r,a;function o(p){r=p.type,a=p.bytesPerElement}function c(p,u){s.drawElements(i,u,r,p*a),t.update(u,i,1)}function l(p,u,m){m!==0&&(s.drawElementsInstanced(i,u,r,p*a,m),t.update(u,i,m))}function h(p,u,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,r,p,0,m);let x=0;for(let f=0;f<m;f++)x+=u[f];t.update(x,i,1)}this.setMode=n,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function cm(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:$e("WebGLInfo: Unknown draw mode:",a);break}}function n(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:n,update:i}}function hm(s,e,t){const i=new WeakMap,n=new dt;function r(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,p=h!==void 0?h.length:0;let u=i.get(o);if(u===void 0||u.count!==p){let w=function(){R.dispose(),i.delete(o),o.removeEventListener("dispose",w)};u!==void 0&&u.texture.dispose();const m=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],d=o.morphAttributes.normal||[],T=o.morphAttributes.color||[];let E=0;m===!0&&(E=1),g===!0&&(E=2),x===!0&&(E=3);let S=o.attributes.position.count*E,M=1;S>e.maxTextureSize&&(M=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const b=new Float32Array(S*M*4*p),R=new ih(b,S,M,p);R.type=mi,R.needsUpdate=!0;const _=E*4;for(let L=0;L<p;L++){const C=f[L],I=d[L],H=T[L],X=S*M*4*L;for(let F=0;F<C.count;F++){const W=F*_;m===!0&&(n.fromBufferAttribute(C,F),b[X+W+0]=n.x,b[X+W+1]=n.y,b[X+W+2]=n.z,b[X+W+3]=0),g===!0&&(n.fromBufferAttribute(I,F),b[X+W+4]=n.x,b[X+W+5]=n.y,b[X+W+6]=n.z,b[X+W+7]=0),x===!0&&(n.fromBufferAttribute(H,F),b[X+W+8]=n.x,b[X+W+9]=n.y,b[X+W+10]=n.z,b[X+W+11]=H.itemSize===4?n.w:1)}}u={count:p,texture:R,size:new we(S,M)},i.set(o,u),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",a.morphTexture,t);else{let m=0;for(let x=0;x<l.length;x++)m+=l[x];const g=o.morphTargetsRelative?1:1-m;c.getUniforms().setValue(s,"morphTargetBaseInfluence",g),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function um(s,e,t,i,n){let r=new WeakMap;function a(l){const h=n.render.frame,p=l.geometry,u=e.get(l,p);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){const m=l.skeleton;r.get(m)!==h&&(m.update(),r.set(m,h))}return u}function o(){r=new WeakMap}function c(l){const h=l.target;h.removeEventListener("dispose",c),i.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}const dm={[Vc]:"LINEAR_TONE_MAPPING",[Gc]:"REINHARD_TONE_MAPPING",[Wc]:"CINEON_TONE_MAPPING",[Vo]:"ACES_FILMIC_TONE_MAPPING",[qc]:"AGX_TONE_MAPPING",[Yc]:"NEUTRAL_TONE_MAPPING",[Xc]:"CUSTOM_TONE_MAPPING"};function fm(s,e,t,i,n,r){const a=new Jt(e,t,{type:s,depthBuffer:n,stencilBuffer:r,samples:i?4:0,depthTexture:n?new os(e,t):void 0}),o=new Jt(e,t,{type:ri,depthBuffer:!1,stencilBuffer:!1}),c=new it;c.setAttribute("position",new ct([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new ct([0,2,0,0,2,0],2));const l=new td({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new rt(c,l),p=new ol(-1,1,1,-1,0,1);let u=null,m=null,g=!1,x,f=null,d=[],T=!1;this.setSize=function(E,S){a.setSize(E,S),o.setSize(E,S);for(let M=0;M<d.length;M++){const b=d[M];b.setSize&&b.setSize(E,S)}},this.setEffects=function(E){d=E,T=d.length>0&&d[0].isRenderPass===!0;const S=a.width,M=a.height;for(let b=0;b<d.length;b++){const R=d[b];R.setSize&&R.setSize(S,M)}},this.begin=function(E,S){if(g||E.toneMapping===Ri&&d.length===0)return!1;if(f=S,S!==null){const M=S.width,b=S.height;(a.width!==M||a.height!==b)&&this.setSize(M,b)}return T===!1&&E.setRenderTarget(a),x=E.toneMapping,E.toneMapping=Ri,!0},this.hasRenderPass=function(){return T},this.end=function(E,S){E.toneMapping=x,g=!0;let M=a,b=o;for(let R=0;R<d.length;R++){const _=d[R];if(_.enabled!==!1&&(_.render(E,b,M,S),_.needsSwap!==!1)){const w=M;M=b,b=w}}if(u!==E.outputColorSpace||m!==E.toneMapping){u=E.outputColorSpace,m=E.toneMapping,l.defines={},Xe.getTransfer(u)===st&&(l.defines.SRGB_TRANSFER="");const R=dm[m];R&&(l.defines[R]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=M.texture,E.setRenderTarget(f),E.render(h,p),f=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),c.dispose(),l.dispose()}}const Sh=new Wt,Oo=new os(1,1),yh=new ih,Mh=new Lu,bh=new uh,uc=[],dc=[],fc=new Float32Array(16),pc=new Float32Array(9),mc=new Float32Array(4);function us(s,e,t){const i=s[0];if(i<=0||i>0)return s;const n=e*t;let r=uc[n];if(r===void 0&&(r=new Float32Array(n),uc[n]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function Lt(s,e){if(s.length!==e.length)return!1;for(let t=0,i=s.length;t<i;t++)if(s[t]!==e[t])return!1;return!0}function It(s,e){for(let t=0,i=e.length;t<i;t++)s[t]=e[t]}function Kr(s,e){let t=dc[e];t===void 0&&(t=new Int32Array(e),dc[e]=t);for(let i=0;i!==e;++i)t[i]=s.allocateTextureUnit();return t}function pm(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function mm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;s.uniform2fv(this.addr,e),It(t,e)}}function gm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Lt(t,e))return;s.uniform3fv(this.addr,e),It(t,e)}}function vm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;s.uniform4fv(this.addr,e),It(t,e)}}function xm(s,e){const t=this.cache,i=e.elements;if(i===void 0){if(Lt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),It(t,e)}else{if(Lt(t,i))return;mc.set(i),s.uniformMatrix2fv(this.addr,!1,mc),It(t,i)}}function _m(s,e){const t=this.cache,i=e.elements;if(i===void 0){if(Lt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),It(t,e)}else{if(Lt(t,i))return;pc.set(i),s.uniformMatrix3fv(this.addr,!1,pc),It(t,i)}}function Sm(s,e){const t=this.cache,i=e.elements;if(i===void 0){if(Lt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),It(t,e)}else{if(Lt(t,i))return;fc.set(i),s.uniformMatrix4fv(this.addr,!1,fc),It(t,i)}}function ym(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function Mm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;s.uniform2iv(this.addr,e),It(t,e)}}function bm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;s.uniform3iv(this.addr,e),It(t,e)}}function Em(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;s.uniform4iv(this.addr,e),It(t,e)}}function Tm(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function wm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;s.uniform2uiv(this.addr,e),It(t,e)}}function Am(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;s.uniform3uiv(this.addr,e),It(t,e)}}function Rm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;s.uniform4uiv(this.addr,e),It(t,e)}}function Cm(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n);let r;this.type===s.SAMPLER_2D_SHADOW?(Oo.compareFunction=t.isReversedDepthBuffer()?Jo:Zo,r=Oo):r=Sh,t.setTexture2D(e||r,n)}function Pm(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTexture3D(e||Mh,n)}function Lm(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTextureCube(e||bh,n)}function Im(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTexture2DArray(e||yh,n)}function Dm(s){switch(s){case 5126:return pm;case 35664:return mm;case 35665:return gm;case 35666:return vm;case 35674:return xm;case 35675:return _m;case 35676:return Sm;case 5124:case 35670:return ym;case 35667:case 35671:return Mm;case 35668:case 35672:return bm;case 35669:case 35673:return Em;case 5125:return Tm;case 36294:return wm;case 36295:return Am;case 36296:return Rm;case 35678:case 36198:case 36298:case 36306:case 35682:return Cm;case 35679:case 36299:case 36307:return Pm;case 35680:case 36300:case 36308:case 36293:return Lm;case 36289:case 36303:case 36311:case 36292:return Im}}function Nm(s,e){s.uniform1fv(this.addr,e)}function Um(s,e){const t=us(e,this.size,2);s.uniform2fv(this.addr,t)}function Om(s,e){const t=us(e,this.size,3);s.uniform3fv(this.addr,t)}function Fm(s,e){const t=us(e,this.size,4);s.uniform4fv(this.addr,t)}function Bm(s,e){const t=us(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function km(s,e){const t=us(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function zm(s,e){const t=us(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function Hm(s,e){s.uniform1iv(this.addr,e)}function Vm(s,e){s.uniform2iv(this.addr,e)}function Gm(s,e){s.uniform3iv(this.addr,e)}function Wm(s,e){s.uniform4iv(this.addr,e)}function Xm(s,e){s.uniform1uiv(this.addr,e)}function qm(s,e){s.uniform2uiv(this.addr,e)}function Ym(s,e){s.uniform3uiv(this.addr,e)}function $m(s,e){s.uniform4uiv(this.addr,e)}function Km(s,e,t){const i=this.cache,n=e.length,r=Kr(t,n);Lt(i,r)||(s.uniform1iv(this.addr,r),It(i,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=Oo:a=Sh;for(let o=0;o!==n;++o)t.setTexture2D(e[o]||a,r[o])}function Zm(s,e,t){const i=this.cache,n=e.length,r=Kr(t,n);Lt(i,r)||(s.uniform1iv(this.addr,r),It(i,r));for(let a=0;a!==n;++a)t.setTexture3D(e[a]||Mh,r[a])}function Jm(s,e,t){const i=this.cache,n=e.length,r=Kr(t,n);Lt(i,r)||(s.uniform1iv(this.addr,r),It(i,r));for(let a=0;a!==n;++a)t.setTextureCube(e[a]||bh,r[a])}function Qm(s,e,t){const i=this.cache,n=e.length,r=Kr(t,n);Lt(i,r)||(s.uniform1iv(this.addr,r),It(i,r));for(let a=0;a!==n;++a)t.setTexture2DArray(e[a]||yh,r[a])}function jm(s){switch(s){case 5126:return Nm;case 35664:return Um;case 35665:return Om;case 35666:return Fm;case 35674:return Bm;case 35675:return km;case 35676:return zm;case 5124:case 35670:return Hm;case 35667:case 35671:return Vm;case 35668:case 35672:return Gm;case 35669:case 35673:return Wm;case 5125:return Xm;case 36294:return qm;case 36295:return Ym;case 36296:return $m;case 35678:case 36198:case 36298:case 36306:case 35682:return Km;case 35679:case 36299:case 36307:return Zm;case 35680:case 36300:case 36308:case 36293:return Jm;case 36289:case 36303:case 36311:case 36292:return Qm}}class eg{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Dm(t.type)}}class tg{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=jm(t.type)}}class ig{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const n=this.seq;for(let r=0,a=n.length;r!==a;++r){const o=n[r];o.setValue(e,t[o.id],i)}}}const Na=/(\w+)(\])?(\[|\.)?/g;function gc(s,e){s.seq.push(e),s.map[e.id]=e}function ng(s,e,t){const i=s.name,n=i.length;for(Na.lastIndex=0;;){const r=Na.exec(i),a=Na.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===n){gc(t,l===void 0?new eg(o,s,e):new tg(o,s,e));break}else{let p=t.map[o];p===void 0&&(p=new ig(o),gc(t,p)),t=p}}}class Ir{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);ng(o,c,this)}const n=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?n.push(a):r.push(a);n.length>0&&(this.seq=n.concat(r))}setValue(e,t,i,n){const r=this.map[t];r!==void 0&&r.setValue(e,i,n)}setOptional(e,t,i){const n=t[i];n!==void 0&&this.setValue(e,i,n)}static upload(e,t,i,n){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,n)}}static seqWithValue(e,t){const i=[];for(let n=0,r=e.length;n!==r;++n){const a=e[n];a.id in t&&i.push(a)}return i}}function vc(s,e,t){const i=s.createShader(e);return s.shaderSource(i,t),s.compileShader(i),i}const sg=37297;let rg=0;function ag(s,e){const t=s.split(`
`),i=[],n=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=n;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const xc=new Oe;function og(s){Xe._getMatrix(xc,Xe.workingColorSpace,s);const e=`mat3( ${xc.elements.map(t=>t.toFixed(4))} )`;switch(Xe.getTransfer(s)){case kr:return[e,"LinearTransferOETF"];case st:return[e,"sRGBTransferOETF"];default:return Ue("WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function _c(s,e,t){const i=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+ag(s.getShaderSource(e),o)}else return r}function lg(s,e){const t=og(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const cg={[Vc]:"Linear",[Gc]:"Reinhard",[Wc]:"Cineon",[Vo]:"ACESFilmic",[qc]:"AgX",[Yc]:"Neutral",[Xc]:"Custom"};function hg(s,e){const t=cg[e];return t===void 0?(Ue("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const vr=new P;function ug(){Xe.getLuminanceCoefficients(vr);const s=vr.x.toFixed(4),e=vr.y.toFixed(4),t=vr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function dg(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Cs).join(`
`)}function fg(s){const e=[];for(const t in s){const i=s[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function pg(s,e){const t={},i=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){const r=s.getActiveAttrib(e,n),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function Cs(s){return s!==""}function Sc(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function yc(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const mg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Fo(s){return s.replace(mg,vg)}const gg=new Map;function vg(s,e){let t=ke[e];if(t===void 0){const i=gg.get(e);if(i!==void 0)t=ke[i],Ue('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Fo(t)}const xg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Mc(s){return s.replace(xg,_g)}function _g(s,e,t,i){let n="";for(let r=parseInt(e);r<parseInt(t);r++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return n}function bc(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const Sg={[Ar]:"SHADOWMAP_TYPE_PCF",[Rs]:"SHADOWMAP_TYPE_VSM"};function yg(s){return Sg[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Mg={[yn]:"ENVMAP_TYPE_CUBE",[rs]:"ENVMAP_TYPE_CUBE",[qr]:"ENVMAP_TYPE_CUBE_UV"};function bg(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":Mg[s.envMapMode]||"ENVMAP_TYPE_CUBE"}const Eg={[rs]:"ENVMAP_MODE_REFRACTION"};function Tg(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":Eg[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}const wg={[Hc]:"ENVMAP_BLENDING_MULTIPLY",[cu]:"ENVMAP_BLENDING_MIX",[hu]:"ENVMAP_BLENDING_ADD"};function Ag(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":wg[s.combine]||"ENVMAP_BLENDING_NONE"}function Rg(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function Cg(s,e,t,i){const n=s.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=yg(t),l=bg(t),h=Tg(t),p=Ag(t),u=Rg(t),m=dg(t),g=fg(r),x=n.createProgram();let f,d,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Cs).join(`
`),f.length>0&&(f+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Cs).join(`
`),d.length>0&&(d+=`
`)):(f=[bc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Cs).join(`
`),d=[bc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+p:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ri?"#define TONE_MAPPING":"",t.toneMapping!==Ri?ke.tonemapping_pars_fragment:"",t.toneMapping!==Ri?hg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ke.colorspace_pars_fragment,lg("linearToOutputTexel",t.outputColorSpace),ug(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Cs).join(`
`)),a=Fo(a),a=Sc(a,t),a=yc(a,t),o=Fo(o),o=Sc(o,t),o=yc(o,t),a=Mc(a),o=Mc(o),t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,f=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,d=["#define varying in",t.glslVersion===Tl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Tl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const E=T+f+a,S=T+d+o,M=vc(n,n.VERTEX_SHADER,E),b=vc(n,n.FRAGMENT_SHADER,S);n.attachShader(x,M),n.attachShader(x,b),t.index0AttributeName!==void 0?n.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&n.bindAttribLocation(x,0,"position"),n.linkProgram(x);function R(C){if(s.debug.checkShaderErrors){const I=n.getProgramInfoLog(x)||"",H=n.getShaderInfoLog(M)||"",X=n.getShaderInfoLog(b)||"",F=I.trim(),W=H.trim(),G=X.trim();let $=!0,Q=!0;if(n.getProgramParameter(x,n.LINK_STATUS)===!1)if($=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(n,x,M,b);else{const ie=_c(n,M,"vertex"),se=_c(n,b,"fragment");$e("WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(x,n.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+F+`
`+ie+`
`+se)}else F!==""?Ue("WebGLProgram: Program Info Log:",F):(W===""||G==="")&&(Q=!1);Q&&(C.diagnostics={runnable:$,programLog:F,vertexShader:{log:W,prefix:f},fragmentShader:{log:G,prefix:d}})}n.deleteShader(M),n.deleteShader(b),_=new Ir(n,x),w=pg(n,x)}let _;this.getUniforms=function(){return _===void 0&&R(this),_};let w;this.getAttributes=function(){return w===void 0&&R(this),w};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=n.getProgramParameter(x,sg)),L},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=rg++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=M,this.fragmentShader=b,this}let Pg=0;class Lg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const n=this._getShaderCacheForMaterial(e);return n.has(t)===!1&&(n.add(t),t.usedTimes++),n.has(i)===!1&&(n.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Ig(e),t.set(e,i)),i}}class Ig{constructor(e){this.id=Pg++,this.code=e,this.usedTimes=0}}function Dg(s){return s===Mn||s===Or||s===Fr}function Ng(s,e,t,i,n,r){const a=new nh,o=new Lg,c=new Set,l=[],h=new Map,p=i.logarithmicDepthBuffer;let u=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(_){return c.add(_),_===0?"uv":`uv${_}`}function x(_,w,L,C,I,H){const X=C.fog,F=I.geometry,W=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?C.environment:null,G=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,$=e.get(_.envMap||W,G),Q=$&&$.mapping===qr?$.image.height:null,ie=m[_.type];_.precision!==null&&(u=i.getMaxPrecision(_.precision),u!==_.precision&&Ue("WebGLProgram.getParameters:",_.precision,"not supported, using",u,"instead."));const se=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,ge=se!==void 0?se.length:0;let be=0;F.morphAttributes.position!==void 0&&(be=1),F.morphAttributes.normal!==void 0&&(be=2),F.morphAttributes.color!==void 0&&(be=3);let He,Ye,K,re;if(ie){const Se=bi[ie];He=Se.vertexShader,Ye=Se.fragmentShader}else{He=_.vertexShader,Ye=_.fragmentShader;const Se=o.getVertexShaderStage(_),St=o.getFragmentShaderStage(_);o.update(_,Se,St),K=Se.id,re=St.id}const ee=s.getRenderTarget(),Ce=s.state.buffers.depth.getReversed(),Ne=I.isInstancedMesh===!0,Pe=I.isBatchedMesh===!0,gt=!!_.map,Ve=!!_.matcap,tt=!!$,je=!!_.aoMap,Ge=!!_.lightMap,vt=!!_.bumpMap&&_.wireframe===!1,ft=!!_.normalMap,Mt=!!_.displacementMap,Ut=!!_.emissiveMap,_t=!!_.metalnessMap,wt=!!_.roughnessMap,N=_.anisotropy>0,Kt=_.clearcoat>0,nt=_.dispersion>0,A=_.iridescence>0,v=_.sheen>0,O=_.transmission>0,z=N&&!!_.anisotropyMap,q=Kt&&!!_.clearcoatMap,ne=Kt&&!!_.clearcoatNormalMap,oe=Kt&&!!_.clearcoatRoughnessMap,Y=A&&!!_.iridescenceMap,J=A&&!!_.iridescenceThicknessMap,le=v&&!!_.sheenColorMap,Ee=v&&!!_.sheenRoughnessMap,ue=!!_.specularMap,ce=!!_.specularColorMap,Le=!!_.specularIntensityMap,De=O&&!!_.transmissionMap,Fe=O&&!!_.thicknessMap,D=!!_.gradientMap,ae=!!_.alphaMap,Z=_.alphaTest>0,he=!!_.alphaHash,me=!!_.extensions;let j=Ri;_.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(j=s.toneMapping);const Me={shaderID:ie,shaderType:_.type,shaderName:_.name,vertexShader:He,fragmentShader:Ye,defines:_.defines,customVertexShaderID:K,customFragmentShaderID:re,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:u,batching:Pe,batchingColor:Pe&&I._colorsTexture!==null,instancing:Ne,instancingColor:Ne&&I.instanceColor!==null,instancingMorph:Ne&&I.morphTexture!==null,outputColorSpace:ee===null?s.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:Xe.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:gt,matcap:Ve,envMap:tt,envMapMode:tt&&$.mapping,envMapCubeUVHeight:Q,aoMap:je,lightMap:Ge,bumpMap:vt,normalMap:ft,displacementMap:Mt,emissiveMap:Ut,normalMapObjectSpace:ft&&_.normalMapType===fu,normalMapTangentSpace:ft&&_.normalMapType===Lo,packedNormalMap:ft&&_.normalMapType===Lo&&Dg(_.normalMap.format),metalnessMap:_t,roughnessMap:wt,anisotropy:N,anisotropyMap:z,clearcoat:Kt,clearcoatMap:q,clearcoatNormalMap:ne,clearcoatRoughnessMap:oe,dispersion:nt,iridescence:A,iridescenceMap:Y,iridescenceThicknessMap:J,sheen:v,sheenColorMap:le,sheenRoughnessMap:Ee,specularMap:ue,specularColorMap:ce,specularIntensityMap:Le,transmission:O,transmissionMap:De,thicknessMap:Fe,gradientMap:D,opaque:_.transparent===!1&&_.blending===es&&_.alphaToCoverage===!1,alphaMap:ae,alphaTest:Z,alphaHash:he,combine:_.combine,mapUv:gt&&g(_.map.channel),aoMapUv:je&&g(_.aoMap.channel),lightMapUv:Ge&&g(_.lightMap.channel),bumpMapUv:vt&&g(_.bumpMap.channel),normalMapUv:ft&&g(_.normalMap.channel),displacementMapUv:Mt&&g(_.displacementMap.channel),emissiveMapUv:Ut&&g(_.emissiveMap.channel),metalnessMapUv:_t&&g(_.metalnessMap.channel),roughnessMapUv:wt&&g(_.roughnessMap.channel),anisotropyMapUv:z&&g(_.anisotropyMap.channel),clearcoatMapUv:q&&g(_.clearcoatMap.channel),clearcoatNormalMapUv:ne&&g(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:oe&&g(_.clearcoatRoughnessMap.channel),iridescenceMapUv:Y&&g(_.iridescenceMap.channel),iridescenceThicknessMapUv:J&&g(_.iridescenceThicknessMap.channel),sheenColorMapUv:le&&g(_.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&g(_.sheenRoughnessMap.channel),specularMapUv:ue&&g(_.specularMap.channel),specularColorMapUv:ce&&g(_.specularColorMap.channel),specularIntensityMapUv:Le&&g(_.specularIntensityMap.channel),transmissionMapUv:De&&g(_.transmissionMap.channel),thicknessMapUv:Fe&&g(_.thicknessMap.channel),alphaMapUv:ae&&g(_.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(ft||N),vertexNormals:!!F.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!F.attributes.uv&&(gt||ae),fog:!!X,useFog:_.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||F.attributes.normal===void 0&&ft===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:Ce,skinning:I.isSkinnedMesh===!0,hasPositionAttribute:F.attributes.position!==void 0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:ge,morphTextureStride:be,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:H.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:s.shadowMap.enabled&&L.length>0,shadowMapType:s.shadowMap.type,toneMapping:j,decodeVideoTexture:gt&&_.map.isVideoTexture===!0&&Xe.getTransfer(_.map.colorSpace)===st,decodeVideoTextureEmissive:Ut&&_.emissiveMap.isVideoTexture===!0&&Xe.getTransfer(_.emissiveMap.colorSpace)===st,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Ot,flipSided:_.side===$t,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:me&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(me&&_.extensions.multiDraw===!0||Pe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Me.vertexUv1s=c.has(1),Me.vertexUv2s=c.has(2),Me.vertexUv3s=c.has(3),c.clear(),Me}function f(_){const w=[];if(_.shaderID?w.push(_.shaderID):(w.push(_.customVertexShaderID),w.push(_.customFragmentShaderID)),_.defines!==void 0)for(const L in _.defines)w.push(L),w.push(_.defines[L]);return _.isRawShaderMaterial===!1&&(d(w,_),T(w,_),w.push(s.outputColorSpace)),w.push(_.customProgramCacheKey),w.join()}function d(_,w){_.push(w.precision),_.push(w.outputColorSpace),_.push(w.envMapMode),_.push(w.envMapCubeUVHeight),_.push(w.mapUv),_.push(w.alphaMapUv),_.push(w.lightMapUv),_.push(w.aoMapUv),_.push(w.bumpMapUv),_.push(w.normalMapUv),_.push(w.displacementMapUv),_.push(w.emissiveMapUv),_.push(w.metalnessMapUv),_.push(w.roughnessMapUv),_.push(w.anisotropyMapUv),_.push(w.clearcoatMapUv),_.push(w.clearcoatNormalMapUv),_.push(w.clearcoatRoughnessMapUv),_.push(w.iridescenceMapUv),_.push(w.iridescenceThicknessMapUv),_.push(w.sheenColorMapUv),_.push(w.sheenRoughnessMapUv),_.push(w.specularMapUv),_.push(w.specularColorMapUv),_.push(w.specularIntensityMapUv),_.push(w.transmissionMapUv),_.push(w.thicknessMapUv),_.push(w.combine),_.push(w.fogExp2),_.push(w.sizeAttenuation),_.push(w.morphTargetsCount),_.push(w.morphAttributeCount),_.push(w.numDirLights),_.push(w.numPointLights),_.push(w.numSpotLights),_.push(w.numSpotLightMaps),_.push(w.numHemiLights),_.push(w.numRectAreaLights),_.push(w.numDirLightShadows),_.push(w.numPointLightShadows),_.push(w.numSpotLightShadows),_.push(w.numSpotLightShadowsWithMaps),_.push(w.numLightProbes),_.push(w.shadowMapType),_.push(w.toneMapping),_.push(w.numClippingPlanes),_.push(w.numClipIntersection),_.push(w.depthPacking)}function T(_,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),w.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function E(_){const w=m[_.type];let L;if(w){const C=bi[w];L=Xr.clone(C.uniforms)}else L=_.uniforms;return L}function S(_,w){let L=h.get(w);return L!==void 0?++L.usedTimes:(L=new Cg(s,w,_,n),l.push(L),h.set(w,L)),L}function M(_){if(--_.usedTimes===0){const w=l.indexOf(_);l[w]=l[l.length-1],l.pop(),h.delete(_.cacheKey),_.destroy()}}function b(_){o.remove(_)}function R(){o.dispose()}return{getParameters:x,getProgramCacheKey:f,getUniforms:E,acquireProgram:S,releaseProgram:M,releaseShaderCache:b,programs:l,dispose:R}}function Ug(){let s=new WeakMap;function e(a){return s.has(a)}function t(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function i(a){s.delete(a)}function n(a,o,c){s.get(a)[o]=c}function r(){s=new WeakMap}return{has:e,get:t,remove:i,update:n,dispose:r}}function Og(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.materialVariant!==e.materialVariant?s.materialVariant-e.materialVariant:s.z!==e.z?s.z-e.z:s.id-e.id}function Ec(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Tc(){const s=[];let e=0;const t=[],i=[],n=[];function r(){e=0,t.length=0,i.length=0,n.length=0}function a(u){let m=0;return u.isInstancedMesh&&(m+=2),u.isSkinnedMesh&&(m+=1),m}function o(u,m,g,x,f,d){let T=s[e];return T===void 0?(T={id:u.id,object:u,geometry:m,material:g,materialVariant:a(u),groupOrder:x,renderOrder:u.renderOrder,z:f,group:d},s[e]=T):(T.id=u.id,T.object=u,T.geometry=m,T.material=g,T.materialVariant=a(u),T.groupOrder=x,T.renderOrder=u.renderOrder,T.z=f,T.group=d),e++,T}function c(u,m,g,x,f,d){const T=o(u,m,g,x,f,d);g.transmission>0?i.push(T):g.transparent===!0?n.push(T):t.push(T)}function l(u,m,g,x,f,d){const T=o(u,m,g,x,f,d);g.transmission>0?i.unshift(T):g.transparent===!0?n.unshift(T):t.unshift(T)}function h(u,m,g){t.length>1&&t.sort(u||Og),i.length>1&&i.sort(m||Ec),n.length>1&&n.sort(m||Ec),g&&(t.reverse(),i.reverse(),n.reverse())}function p(){for(let u=e,m=s.length;u<m;u++){const g=s[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:n,init:r,push:c,unshift:l,finish:p,sort:h}}function Fg(){let s=new WeakMap;function e(i,n){const r=s.get(i);let a;return r===void 0?(a=new Tc,s.set(i,[a])):n>=r.length?(a=new Tc,r.push(a)):a=r[n],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function Bg(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new P,color:new te};break;case"SpotLight":t={position:new P,direction:new P,color:new te,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new te,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new te,groundColor:new te};break;case"RectAreaLight":t={color:new te,position:new P,halfWidth:new P,halfHeight:new P};break}return s[e.id]=t,t}}}function kg(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let zg=0;function Hg(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function Vg(s){const e=new Bg,t=kg(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new P);const n=new P,r=new at,a=new at;function o(l){let h=0,p=0,u=0;for(let w=0;w<9;w++)i.probe[w].set(0,0,0);let m=0,g=0,x=0,f=0,d=0,T=0,E=0,S=0,M=0,b=0,R=0;l.sort(Hg);for(let w=0,L=l.length;w<L;w++){const C=l[w],I=C.color,H=C.intensity,X=C.distance;let F=null;if(C.shadow&&C.shadow.map&&(C.shadow.map.texture.format===Mn?F=C.shadow.map.texture:F=C.shadow.map.depthTexture||C.shadow.map.texture),C.isAmbientLight)h+=I.r*H,p+=I.g*H,u+=I.b*H;else if(C.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(C.sh.coefficients[W],H);R++}else if(C.isDirectionalLight){const W=e.get(C);if(W.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const G=C.shadow,$=t.get(C);$.shadowIntensity=G.intensity,$.shadowBias=G.bias,$.shadowNormalBias=G.normalBias,$.shadowRadius=G.radius,$.shadowMapSize=G.mapSize,i.directionalShadow[m]=$,i.directionalShadowMap[m]=F,i.directionalShadowMatrix[m]=C.shadow.matrix,T++}i.directional[m]=W,m++}else if(C.isSpotLight){const W=e.get(C);W.position.setFromMatrixPosition(C.matrixWorld),W.color.copy(I).multiplyScalar(H),W.distance=X,W.coneCos=Math.cos(C.angle),W.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),W.decay=C.decay,i.spot[x]=W;const G=C.shadow;if(C.map&&(i.spotLightMap[M]=C.map,M++,G.updateMatrices(C),C.castShadow&&b++),i.spotLightMatrix[x]=G.matrix,C.castShadow){const $=t.get(C);$.shadowIntensity=G.intensity,$.shadowBias=G.bias,$.shadowNormalBias=G.normalBias,$.shadowRadius=G.radius,$.shadowMapSize=G.mapSize,i.spotShadow[x]=$,i.spotShadowMap[x]=F,S++}x++}else if(C.isRectAreaLight){const W=e.get(C);W.color.copy(I).multiplyScalar(H),W.halfWidth.set(C.width*.5,0,0),W.halfHeight.set(0,C.height*.5,0),i.rectArea[f]=W,f++}else if(C.isPointLight){const W=e.get(C);if(W.color.copy(C.color).multiplyScalar(C.intensity),W.distance=C.distance,W.decay=C.decay,C.castShadow){const G=C.shadow,$=t.get(C);$.shadowIntensity=G.intensity,$.shadowBias=G.bias,$.shadowNormalBias=G.normalBias,$.shadowRadius=G.radius,$.shadowMapSize=G.mapSize,$.shadowCameraNear=G.camera.near,$.shadowCameraFar=G.camera.far,i.pointShadow[g]=$,i.pointShadowMap[g]=F,i.pointShadowMatrix[g]=C.shadow.matrix,E++}i.point[g]=W,g++}else if(C.isHemisphereLight){const W=e.get(C);W.skyColor.copy(C.color).multiplyScalar(H),W.groundColor.copy(C.groundColor).multiplyScalar(H),i.hemi[d]=W,d++}}f>0&&(s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=de.LTC_FLOAT_1,i.rectAreaLTC2=de.LTC_FLOAT_2):(i.rectAreaLTC1=de.LTC_HALF_1,i.rectAreaLTC2=de.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=p,i.ambient[2]=u;const _=i.hash;(_.directionalLength!==m||_.pointLength!==g||_.spotLength!==x||_.rectAreaLength!==f||_.hemiLength!==d||_.numDirectionalShadows!==T||_.numPointShadows!==E||_.numSpotShadows!==S||_.numSpotMaps!==M||_.numLightProbes!==R)&&(i.directional.length=m,i.spot.length=x,i.rectArea.length=f,i.point.length=g,i.hemi.length=d,i.directionalShadow.length=T,i.directionalShadowMap.length=T,i.pointShadow.length=E,i.pointShadowMap.length=E,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=T,i.pointShadowMatrix.length=E,i.spotLightMatrix.length=S+M-b,i.spotLightMap.length=M,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=R,_.directionalLength=m,_.pointLength=g,_.spotLength=x,_.rectAreaLength=f,_.hemiLength=d,_.numDirectionalShadows=T,_.numPointShadows=E,_.numSpotShadows=S,_.numSpotMaps=M,_.numLightProbes=R,i.version=zg++)}function c(l,h){let p=0,u=0,m=0,g=0,x=0;const f=h.matrixWorldInverse;for(let d=0,T=l.length;d<T;d++){const E=l[d];if(E.isDirectionalLight){const S=i.directional[p];S.direction.setFromMatrixPosition(E.matrixWorld),n.setFromMatrixPosition(E.target.matrixWorld),S.direction.sub(n),S.direction.transformDirection(f),p++}else if(E.isSpotLight){const S=i.spot[m];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(f),S.direction.setFromMatrixPosition(E.matrixWorld),n.setFromMatrixPosition(E.target.matrixWorld),S.direction.sub(n),S.direction.transformDirection(f),m++}else if(E.isRectAreaLight){const S=i.rectArea[g];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(f),a.identity(),r.copy(E.matrixWorld),r.premultiply(f),a.extractRotation(r),S.halfWidth.set(E.width*.5,0,0),S.halfHeight.set(0,E.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),g++}else if(E.isPointLight){const S=i.point[u];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(f),u++}else if(E.isHemisphereLight){const S=i.hemi[x];S.direction.setFromMatrixPosition(E.matrixWorld),S.direction.transformDirection(f),x++}}}return{setup:o,setupView:c,state:i}}function wc(s){const e=new Vg(s),t=[],i=[],n=[];function r(u){p.camera=u,t.length=0,i.length=0,n.length=0}function a(u){t.push(u)}function o(u){i.push(u)}function c(u){n.push(u)}function l(){e.setup(t)}function h(u){e.setupView(t,u)}const p={lightsArray:t,shadowsArray:i,lightProbeGridArray:n,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:p,setupLights:l,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function Gg(s){let e=new WeakMap;function t(n,r=0){const a=e.get(n);let o;return a===void 0?(o=new wc(s),e.set(n,[o])):r>=a.length?(o=new wc(s),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const Wg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Xg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,qg=[new P(1,0,0),new P(-1,0,0),new P(0,1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1)],Yg=[new P(0,-1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1),new P(0,-1,0),new P(0,-1,0)],Ac=new at,bs=new P,Ua=new P;function $g(s,e,t){let i=new il;const n=new we,r=new we,a=new dt,o=new id,c=new nd,l={},h=t.maxTextureSize,p={[ki]:$t,[$t]:ki,[Ot]:Ot},u=new et({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new we},radius:{value:4}},vertexShader:Wg,fragmentShader:Xg}),m=u.clone();m.defines.HORIZONTAL_PASS=1;const g=new it;g.setAttribute("position",new Ie(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new rt(g,u),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ar;let d=this.type;this.render=function(b,R,_){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||b.length===0)return;this.type===Wh&&(Ue("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Ar);const w=s.getRenderTarget(),L=s.getActiveCubeFace(),C=s.getActiveMipmapLevel(),I=s.state;I.setBlending(Ai),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const H=d!==this.type;H&&R.traverse(function(X){X.material&&(Array.isArray(X.material)?X.material.forEach(F=>F.needsUpdate=!0):X.material.needsUpdate=!0)});for(let X=0,F=b.length;X<F;X++){const W=b[X],G=W.shadow;if(G===void 0){Ue("WebGLShadowMap:",W,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;n.copy(G.mapSize);const $=G.getFrameExtents();n.multiply($),r.copy(G.mapSize),(n.x>h||n.y>h)&&(n.x>h&&(r.x=Math.floor(h/$.x),n.x=r.x*$.x,G.mapSize.x=r.x),n.y>h&&(r.y=Math.floor(h/$.y),n.y=r.y*$.y,G.mapSize.y=r.y));const Q=s.state.buffers.depth.getReversed();if(G.camera._reversedDepth=Q,G.map===null||H===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===Rs){if(W.isPointLight){Ue("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new Jt(n.x,n.y,{format:Mn,type:ri,minFilter:Gt,magFilter:Gt,generateMipmaps:!1}),G.map.texture.name=W.name+".shadowMap",G.map.depthTexture=new os(n.x,n.y,mi),G.map.depthTexture.name=W.name+".shadowMapDepth",G.map.depthTexture.format=zi,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Ft,G.map.depthTexture.magFilter=Ft}else W.isPointLight?(G.map=new _h(n.x),G.map.depthTexture=new Ju(n.x,Ci)):(G.map=new Jt(n.x,n.y),G.map.depthTexture=new os(n.x,n.y,Ci)),G.map.depthTexture.name=W.name+".shadowMap",G.map.depthTexture.format=zi,this.type===Ar?(G.map.depthTexture.compareFunction=Q?Jo:Zo,G.map.depthTexture.minFilter=Gt,G.map.depthTexture.magFilter=Gt):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Ft,G.map.depthTexture.magFilter=Ft);G.camera.updateProjectionMatrix()}const ie=G.map.isWebGLCubeRenderTarget?6:1;for(let se=0;se<ie;se++){if(G.map.isWebGLCubeRenderTarget)s.setRenderTarget(G.map,se),s.clear();else{se===0&&(s.setRenderTarget(G.map),s.clear());const ge=G.getViewport(se);a.set(r.x*ge.x,r.y*ge.y,r.x*ge.z,r.y*ge.w),I.viewport(a)}if(W.isPointLight){const ge=G.camera,be=G.matrix,He=W.distance||ge.far;He!==ge.far&&(ge.far=He,ge.updateProjectionMatrix()),bs.setFromMatrixPosition(W.matrixWorld),ge.position.copy(bs),Ua.copy(ge.position),Ua.add(qg[se]),ge.up.copy(Yg[se]),ge.lookAt(Ua),ge.updateMatrixWorld(),be.makeTranslation(-bs.x,-bs.y,-bs.z),Ac.multiplyMatrices(ge.projectionMatrix,ge.matrixWorldInverse),G._frustum.setFromProjectionMatrix(Ac,ge.coordinateSystem,ge.reversedDepth)}else G.updateMatrices(W);i=G.getFrustum(),S(R,_,G.camera,W,this.type)}G.isPointLightShadow!==!0&&this.type===Rs&&T(G,_),G.needsUpdate=!1}d=this.type,f.needsUpdate=!1,s.setRenderTarget(w,L,C)};function T(b,R){const _=e.update(x);u.defines.VSM_SAMPLES!==b.blurSamples&&(u.defines.VSM_SAMPLES=b.blurSamples,m.defines.VSM_SAMPLES=b.blurSamples,u.needsUpdate=!0,m.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Jt(n.x,n.y,{format:Mn,type:ri})),u.uniforms.shadow_pass.value=b.map.depthTexture,u.uniforms.resolution.value=b.mapSize,u.uniforms.radius.value=b.radius,s.setRenderTarget(b.mapPass),s.clear(),s.renderBufferDirect(R,null,_,u,x,null),m.uniforms.shadow_pass.value=b.mapPass.texture,m.uniforms.resolution.value=b.mapSize,m.uniforms.radius.value=b.radius,s.setRenderTarget(b.map),s.clear(),s.renderBufferDirect(R,null,_,m,x,null)}function E(b,R,_,w){let L=null;const C=_.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(C!==void 0)L=C;else if(L=_.isPointLight===!0?c:o,s.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const I=L.uuid,H=R.uuid;let X=l[I];X===void 0&&(X={},l[I]=X);let F=X[H];F===void 0&&(F=L.clone(),X[H]=F,R.addEventListener("dispose",M)),L=F}if(L.visible=R.visible,L.wireframe=R.wireframe,w===Rs?L.side=R.shadowSide!==null?R.shadowSide:R.side:L.side=R.shadowSide!==null?R.shadowSide:p[R.side],L.alphaMap=R.alphaMap,L.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,L.map=R.map,L.clipShadows=R.clipShadows,L.clippingPlanes=R.clippingPlanes,L.clipIntersection=R.clipIntersection,L.displacementMap=R.displacementMap,L.displacementScale=R.displacementScale,L.displacementBias=R.displacementBias,L.wireframeLinewidth=R.wireframeLinewidth,L.linewidth=R.linewidth,_.isPointLight===!0&&L.isMeshDistanceMaterial===!0){const I=s.properties.get(L);I.light=_}return L}function S(b,R,_,w,L){if(b.visible===!1)return;if(b.layers.test(R.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&L===Rs)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,b.matrixWorld);const H=e.update(b),X=b.material;if(Array.isArray(X)){const F=H.groups;for(let W=0,G=F.length;W<G;W++){const $=F[W],Q=X[$.materialIndex];if(Q&&Q.visible){const ie=E(b,Q,w,L);b.onBeforeShadow(s,b,R,_,H,ie,$),s.renderBufferDirect(_,null,H,ie,b,$),b.onAfterShadow(s,b,R,_,H,ie,$)}}}else if(X.visible){const F=E(b,X,w,L);b.onBeforeShadow(s,b,R,_,H,F,null),s.renderBufferDirect(_,null,H,F,b,null),b.onAfterShadow(s,b,R,_,H,F,null)}}const I=b.children;for(let H=0,X=I.length;H<X;H++)S(I[H],R,_,w,L)}function M(b){b.target.removeEventListener("dispose",M);for(const _ in l){const w=l[_],L=b.target.uuid;L in w&&(w[L].dispose(),delete w[L])}}}function Kg(s,e){function t(){let D=!1;const ae=new dt;let Z=null;const he=new dt(0,0,0,0);return{setMask:function(me){Z!==me&&!D&&(s.colorMask(me,me,me,me),Z=me)},setLocked:function(me){D=me},setClear:function(me,j,Me,Se,St){St===!0&&(me*=Se,j*=Se,Me*=Se),ae.set(me,j,Me,Se),he.equals(ae)===!1&&(s.clearColor(me,j,Me,Se),he.copy(ae))},reset:function(){D=!1,Z=null,he.set(-1,0,0,0)}}}function i(){let D=!1,ae=!1,Z=null,he=null,me=null;return{setReversed:function(j){if(ae!==j){const Me=e.get("EXT_clip_control");j?Me.clipControlEXT(Me.LOWER_LEFT_EXT,Me.ZERO_TO_ONE_EXT):Me.clipControlEXT(Me.LOWER_LEFT_EXT,Me.NEGATIVE_ONE_TO_ONE_EXT),ae=j;const Se=me;me=null,this.setClear(Se)}},getReversed:function(){return ae},setTest:function(j){j?ee(s.DEPTH_TEST):Ce(s.DEPTH_TEST)},setMask:function(j){Z!==j&&!D&&(s.depthMask(j),Z=j)},setFunc:function(j){if(ae&&(j=Eu[j]),he!==j){switch(j){case qa:s.depthFunc(s.NEVER);break;case Ya:s.depthFunc(s.ALWAYS);break;case $a:s.depthFunc(s.LESS);break;case ss:s.depthFunc(s.LEQUAL);break;case Ka:s.depthFunc(s.EQUAL);break;case Za:s.depthFunc(s.GEQUAL);break;case Ja:s.depthFunc(s.GREATER);break;case Qa:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}he=j}},setLocked:function(j){D=j},setClear:function(j){me!==j&&(me=j,ae&&(j=1-j),s.clearDepth(j))},reset:function(){D=!1,Z=null,he=null,me=null,ae=!1}}}function n(){let D=!1,ae=null,Z=null,he=null,me=null,j=null,Me=null,Se=null,St=null;return{setTest:function(pt){D||(pt?ee(s.STENCIL_TEST):Ce(s.STENCIL_TEST))},setMask:function(pt){ae!==pt&&!D&&(s.stencilMask(pt),ae=pt)},setFunc:function(pt,vi,xi){(Z!==pt||he!==vi||me!==xi)&&(s.stencilFunc(pt,vi,xi),Z=pt,he=vi,me=xi)},setOp:function(pt,vi,xi){(j!==pt||Me!==vi||Se!==xi)&&(s.stencilOp(pt,vi,xi),j=pt,Me=vi,Se=xi)},setLocked:function(pt){D=pt},setClear:function(pt){St!==pt&&(s.clearStencil(pt),St=pt)},reset:function(){D=!1,ae=null,Z=null,he=null,me=null,j=null,Me=null,Se=null,St=null}}}const r=new t,a=new i,o=new n,c=new WeakMap,l=new WeakMap;let h={},p={},u={},m=new WeakMap,g=[],x=null,f=!1,d=null,T=null,E=null,S=null,M=null,b=null,R=null,_=new te(0,0,0),w=0,L=!1,C=null,I=null,H=null,X=null,F=null;const W=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,$=0;const Q=s.getParameter(s.VERSION);Q.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(Q)[1]),G=$>=1):Q.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),G=$>=2);let ie=null,se={};const ge=s.getParameter(s.SCISSOR_BOX),be=s.getParameter(s.VIEWPORT),He=new dt().fromArray(ge),Ye=new dt().fromArray(be);function K(D,ae,Z,he){const me=new Uint8Array(4),j=s.createTexture();s.bindTexture(D,j),s.texParameteri(D,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(D,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Me=0;Me<Z;Me++)D===s.TEXTURE_3D||D===s.TEXTURE_2D_ARRAY?s.texImage3D(ae,0,s.RGBA,1,1,he,0,s.RGBA,s.UNSIGNED_BYTE,me):s.texImage2D(ae+Me,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,me);return j}const re={};re[s.TEXTURE_2D]=K(s.TEXTURE_2D,s.TEXTURE_2D,1),re[s.TEXTURE_CUBE_MAP]=K(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),re[s.TEXTURE_2D_ARRAY]=K(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),re[s.TEXTURE_3D]=K(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ee(s.DEPTH_TEST),a.setFunc(ss),vt(!1),ft(yl),ee(s.CULL_FACE),je(Ai);function ee(D){h[D]!==!0&&(s.enable(D),h[D]=!0)}function Ce(D){h[D]!==!1&&(s.disable(D),h[D]=!1)}function Ne(D,ae){return u[D]!==ae?(s.bindFramebuffer(D,ae),u[D]=ae,D===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=ae),D===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=ae),!0):!1}function Pe(D,ae){let Z=g,he=!1;if(D){Z=m.get(ae),Z===void 0&&(Z=[],m.set(ae,Z));const me=D.textures;if(Z.length!==me.length||Z[0]!==s.COLOR_ATTACHMENT0){for(let j=0,Me=me.length;j<Me;j++)Z[j]=s.COLOR_ATTACHMENT0+j;Z.length=me.length,he=!0}}else Z[0]!==s.BACK&&(Z[0]=s.BACK,he=!0);he&&s.drawBuffers(Z)}function gt(D){return x!==D?(s.useProgram(D),x=D,!0):!1}const Ve={[mn]:s.FUNC_ADD,[qh]:s.FUNC_SUBTRACT,[Yh]:s.FUNC_REVERSE_SUBTRACT};Ve[$h]=s.MIN,Ve[Kh]=s.MAX;const tt={[Zh]:s.ZERO,[Jh]:s.ONE,[Qh]:s.SRC_COLOR,[Wa]:s.SRC_ALPHA,[su]:s.SRC_ALPHA_SATURATE,[iu]:s.DST_COLOR,[eu]:s.DST_ALPHA,[jh]:s.ONE_MINUS_SRC_COLOR,[Xa]:s.ONE_MINUS_SRC_ALPHA,[nu]:s.ONE_MINUS_DST_COLOR,[tu]:s.ONE_MINUS_DST_ALPHA,[ru]:s.CONSTANT_COLOR,[au]:s.ONE_MINUS_CONSTANT_COLOR,[ou]:s.CONSTANT_ALPHA,[lu]:s.ONE_MINUS_CONSTANT_ALPHA};function je(D,ae,Z,he,me,j,Me,Se,St,pt){if(D===Ai){f===!0&&(Ce(s.BLEND),f=!1);return}if(f===!1&&(ee(s.BLEND),f=!0),D!==Xh){if(D!==d||pt!==L){if((T!==mn||M!==mn)&&(s.blendEquation(s.FUNC_ADD),T=mn,M=mn),pt)switch(D){case es:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Qe:s.blendFunc(s.ONE,s.ONE);break;case Ml:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case bl:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:$e("WebGLState: Invalid blending: ",D);break}else switch(D){case es:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Qe:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Ml:$e("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case bl:$e("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:$e("WebGLState: Invalid blending: ",D);break}E=null,S=null,b=null,R=null,_.set(0,0,0),w=0,d=D,L=pt}return}me=me||ae,j=j||Z,Me=Me||he,(ae!==T||me!==M)&&(s.blendEquationSeparate(Ve[ae],Ve[me]),T=ae,M=me),(Z!==E||he!==S||j!==b||Me!==R)&&(s.blendFuncSeparate(tt[Z],tt[he],tt[j],tt[Me]),E=Z,S=he,b=j,R=Me),(Se.equals(_)===!1||St!==w)&&(s.blendColor(Se.r,Se.g,Se.b,St),_.copy(Se),w=St),d=D,L=!1}function Ge(D,ae){D.side===Ot?Ce(s.CULL_FACE):ee(s.CULL_FACE);let Z=D.side===$t;ae&&(Z=!Z),vt(Z),D.blending===es&&D.transparent===!1?je(Ai):je(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);const he=D.stencilWrite;o.setTest(he),he&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Ut(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?ee(s.SAMPLE_ALPHA_TO_COVERAGE):Ce(s.SAMPLE_ALPHA_TO_COVERAGE)}function vt(D){C!==D&&(D?s.frontFace(s.CW):s.frontFace(s.CCW),C=D)}function ft(D){D!==Vh?(ee(s.CULL_FACE),D!==I&&(D===yl?s.cullFace(s.BACK):D===Gh?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Ce(s.CULL_FACE),I=D}function Mt(D){D!==H&&(G&&s.lineWidth(D),H=D)}function Ut(D,ae,Z){D?(ee(s.POLYGON_OFFSET_FILL),(X!==ae||F!==Z)&&(X=ae,F=Z,a.getReversed()&&(ae=-ae),s.polygonOffset(ae,Z))):Ce(s.POLYGON_OFFSET_FILL)}function _t(D){D?ee(s.SCISSOR_TEST):Ce(s.SCISSOR_TEST)}function wt(D){D===void 0&&(D=s.TEXTURE0+W-1),ie!==D&&(s.activeTexture(D),ie=D)}function N(D,ae,Z){Z===void 0&&(ie===null?Z=s.TEXTURE0+W-1:Z=ie);let he=se[Z];he===void 0&&(he={type:void 0,texture:void 0},se[Z]=he),(he.type!==D||he.texture!==ae)&&(ie!==Z&&(s.activeTexture(Z),ie=Z),s.bindTexture(D,ae||re[D]),he.type=D,he.texture=ae)}function Kt(){const D=se[ie];D!==void 0&&D.type!==void 0&&(s.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function nt(){try{s.compressedTexImage2D(...arguments)}catch(D){$e("WebGLState:",D)}}function A(){try{s.compressedTexImage3D(...arguments)}catch(D){$e("WebGLState:",D)}}function v(){try{s.texSubImage2D(...arguments)}catch(D){$e("WebGLState:",D)}}function O(){try{s.texSubImage3D(...arguments)}catch(D){$e("WebGLState:",D)}}function z(){try{s.compressedTexSubImage2D(...arguments)}catch(D){$e("WebGLState:",D)}}function q(){try{s.compressedTexSubImage3D(...arguments)}catch(D){$e("WebGLState:",D)}}function ne(){try{s.texStorage2D(...arguments)}catch(D){$e("WebGLState:",D)}}function oe(){try{s.texStorage3D(...arguments)}catch(D){$e("WebGLState:",D)}}function Y(){try{s.texImage2D(...arguments)}catch(D){$e("WebGLState:",D)}}function J(){try{s.texImage3D(...arguments)}catch(D){$e("WebGLState:",D)}}function le(D){return p[D]!==void 0?p[D]:s.getParameter(D)}function Ee(D,ae){p[D]!==ae&&(s.pixelStorei(D,ae),p[D]=ae)}function ue(D){He.equals(D)===!1&&(s.scissor(D.x,D.y,D.z,D.w),He.copy(D))}function ce(D){Ye.equals(D)===!1&&(s.viewport(D.x,D.y,D.z,D.w),Ye.copy(D))}function Le(D,ae){let Z=l.get(ae);Z===void 0&&(Z=new WeakMap,l.set(ae,Z));let he=Z.get(D);he===void 0&&(he=s.getUniformBlockIndex(ae,D.name),Z.set(D,he))}function De(D,ae){const he=l.get(ae).get(D);c.get(ae)!==he&&(s.uniformBlockBinding(ae,he,D.__bindingPointIndex),c.set(ae,he))}function Fe(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},p={},ie=null,se={},u={},m=new WeakMap,g=[],x=null,f=!1,d=null,T=null,E=null,S=null,M=null,b=null,R=null,_=new te(0,0,0),w=0,L=!1,C=null,I=null,H=null,X=null,F=null,He.set(0,0,s.canvas.width,s.canvas.height),Ye.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ee,disable:Ce,bindFramebuffer:Ne,drawBuffers:Pe,useProgram:gt,setBlending:je,setMaterial:Ge,setFlipSided:vt,setCullFace:ft,setLineWidth:Mt,setPolygonOffset:Ut,setScissorTest:_t,activeTexture:wt,bindTexture:N,unbindTexture:Kt,compressedTexImage2D:nt,compressedTexImage3D:A,texImage2D:Y,texImage3D:J,pixelStorei:Ee,getParameter:le,updateUBOMapping:Le,uniformBlockBinding:De,texStorage2D:ne,texStorage3D:oe,texSubImage2D:v,texSubImage3D:O,compressedTexSubImage2D:z,compressedTexSubImage3D:q,scissor:ue,viewport:ce,reset:Fe}}function Zg(s,e,t,i,n,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new we,h=new WeakMap,p=new Set;let u;const m=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(A,v){return g?new OffscreenCanvas(A,v):zr("canvas")}function f(A,v,O){let z=1;const q=nt(A);if((q.width>O||q.height>O)&&(z=O/Math.max(q.width,q.height)),z<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const ne=Math.floor(z*q.width),oe=Math.floor(z*q.height);u===void 0&&(u=x(ne,oe));const Y=v?x(ne,oe):u;return Y.width=ne,Y.height=oe,Y.getContext("2d").drawImage(A,0,0,ne,oe),Ue("WebGLRenderer: Texture has been resized from ("+q.width+"x"+q.height+") to ("+ne+"x"+oe+")."),Y}else return"data"in A&&Ue("WebGLRenderer: Image in DataTexture is too big ("+q.width+"x"+q.height+")."),A;return A}function d(A){return A.generateMipmaps}function T(A){s.generateMipmap(A)}function E(A){return A.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?s.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function S(A,v,O,z,q,ne=!1){if(A!==null){if(s[A]!==void 0)return s[A];Ue("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let oe;z&&(oe=e.get("EXT_texture_norm16"),oe||Ue("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Y=v;if(v===s.RED&&(O===s.FLOAT&&(Y=s.R32F),O===s.HALF_FLOAT&&(Y=s.R16F),O===s.UNSIGNED_BYTE&&(Y=s.R8),O===s.UNSIGNED_SHORT&&oe&&(Y=oe.R16_EXT),O===s.SHORT&&oe&&(Y=oe.R16_SNORM_EXT)),v===s.RED_INTEGER&&(O===s.UNSIGNED_BYTE&&(Y=s.R8UI),O===s.UNSIGNED_SHORT&&(Y=s.R16UI),O===s.UNSIGNED_INT&&(Y=s.R32UI),O===s.BYTE&&(Y=s.R8I),O===s.SHORT&&(Y=s.R16I),O===s.INT&&(Y=s.R32I)),v===s.RG&&(O===s.FLOAT&&(Y=s.RG32F),O===s.HALF_FLOAT&&(Y=s.RG16F),O===s.UNSIGNED_BYTE&&(Y=s.RG8),O===s.UNSIGNED_SHORT&&oe&&(Y=oe.RG16_EXT),O===s.SHORT&&oe&&(Y=oe.RG16_SNORM_EXT)),v===s.RG_INTEGER&&(O===s.UNSIGNED_BYTE&&(Y=s.RG8UI),O===s.UNSIGNED_SHORT&&(Y=s.RG16UI),O===s.UNSIGNED_INT&&(Y=s.RG32UI),O===s.BYTE&&(Y=s.RG8I),O===s.SHORT&&(Y=s.RG16I),O===s.INT&&(Y=s.RG32I)),v===s.RGB_INTEGER&&(O===s.UNSIGNED_BYTE&&(Y=s.RGB8UI),O===s.UNSIGNED_SHORT&&(Y=s.RGB16UI),O===s.UNSIGNED_INT&&(Y=s.RGB32UI),O===s.BYTE&&(Y=s.RGB8I),O===s.SHORT&&(Y=s.RGB16I),O===s.INT&&(Y=s.RGB32I)),v===s.RGBA_INTEGER&&(O===s.UNSIGNED_BYTE&&(Y=s.RGBA8UI),O===s.UNSIGNED_SHORT&&(Y=s.RGBA16UI),O===s.UNSIGNED_INT&&(Y=s.RGBA32UI),O===s.BYTE&&(Y=s.RGBA8I),O===s.SHORT&&(Y=s.RGBA16I),O===s.INT&&(Y=s.RGBA32I)),v===s.RGB&&(O===s.UNSIGNED_SHORT&&oe&&(Y=oe.RGB16_EXT),O===s.SHORT&&oe&&(Y=oe.RGB16_SNORM_EXT),O===s.UNSIGNED_INT_5_9_9_9_REV&&(Y=s.RGB9_E5),O===s.UNSIGNED_INT_10F_11F_11F_REV&&(Y=s.R11F_G11F_B10F)),v===s.RGBA){const J=ne?kr:Xe.getTransfer(q);O===s.FLOAT&&(Y=s.RGBA32F),O===s.HALF_FLOAT&&(Y=s.RGBA16F),O===s.UNSIGNED_BYTE&&(Y=J===st?s.SRGB8_ALPHA8:s.RGBA8),O===s.UNSIGNED_SHORT&&oe&&(Y=oe.RGBA16_EXT),O===s.SHORT&&oe&&(Y=oe.RGBA16_SNORM_EXT),O===s.UNSIGNED_SHORT_4_4_4_4&&(Y=s.RGBA4),O===s.UNSIGNED_SHORT_5_5_5_1&&(Y=s.RGB5_A1)}return(Y===s.R16F||Y===s.R32F||Y===s.RG16F||Y===s.RG32F||Y===s.RGBA16F||Y===s.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function M(A,v){let O;return A?v===null||v===Ci||v===Ds?O=s.DEPTH24_STENCIL8:v===mi?O=s.DEPTH32F_STENCIL8:v===Is&&(O=s.DEPTH24_STENCIL8,Ue("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Ci||v===Ds?O=s.DEPTH_COMPONENT24:v===mi?O=s.DEPTH_COMPONENT32F:v===Is&&(O=s.DEPTH_COMPONENT16),O}function b(A,v){return d(A)===!0||A.isFramebufferTexture&&A.minFilter!==Ft&&A.minFilter!==Gt?Math.log2(Math.max(v.width,v.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?v.mipmaps.length:1}function R(A){const v=A.target;v.removeEventListener("dispose",R),w(v),v.isVideoTexture&&h.delete(v),v.isHTMLTexture&&p.delete(v)}function _(A){const v=A.target;v.removeEventListener("dispose",_),C(v)}function w(A){const v=i.get(A);if(v.__webglInit===void 0)return;const O=A.source,z=m.get(O);if(z){const q=z[v.__cacheKey];q.usedTimes--,q.usedTimes===0&&L(A),Object.keys(z).length===0&&m.delete(O)}i.remove(A)}function L(A){const v=i.get(A);s.deleteTexture(v.__webglTexture);const O=A.source,z=m.get(O);delete z[v.__cacheKey],a.memory.textures--}function C(A){const v=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let z=0;z<6;z++){if(Array.isArray(v.__webglFramebuffer[z]))for(let q=0;q<v.__webglFramebuffer[z].length;q++)s.deleteFramebuffer(v.__webglFramebuffer[z][q]);else s.deleteFramebuffer(v.__webglFramebuffer[z]);v.__webglDepthbuffer&&s.deleteRenderbuffer(v.__webglDepthbuffer[z])}else{if(Array.isArray(v.__webglFramebuffer))for(let z=0;z<v.__webglFramebuffer.length;z++)s.deleteFramebuffer(v.__webglFramebuffer[z]);else s.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&s.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&s.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let z=0;z<v.__webglColorRenderbuffer.length;z++)v.__webglColorRenderbuffer[z]&&s.deleteRenderbuffer(v.__webglColorRenderbuffer[z]);v.__webglDepthRenderbuffer&&s.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const O=A.textures;for(let z=0,q=O.length;z<q;z++){const ne=i.get(O[z]);ne.__webglTexture&&(s.deleteTexture(ne.__webglTexture),a.memory.textures--),i.remove(O[z])}i.remove(A)}let I=0;function H(){I=0}function X(){return I}function F(A){I=A}function W(){const A=I;return A>=n.maxTextures&&Ue("WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+n.maxTextures),I+=1,A}function G(A){const v=[];return v.push(A.wrapS),v.push(A.wrapT),v.push(A.wrapR||0),v.push(A.magFilter),v.push(A.minFilter),v.push(A.anisotropy),v.push(A.internalFormat),v.push(A.format),v.push(A.type),v.push(A.generateMipmaps),v.push(A.premultiplyAlpha),v.push(A.flipY),v.push(A.unpackAlignment),v.push(A.colorSpace),v.join()}function $(A,v){const O=i.get(A);if(A.isVideoTexture&&N(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&O.__version!==A.version){const z=A.image;if(z===null)Ue("WebGLRenderer: Texture marked for update but no image data found.");else if(z.complete===!1)Ue("WebGLRenderer: Texture marked for update but image is incomplete");else{Ce(O,A,v);return}}else A.isExternalTexture&&(O.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,O.__webglTexture,s.TEXTURE0+v)}function Q(A,v){const O=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&O.__version!==A.version){Ce(O,A,v);return}else A.isExternalTexture&&(O.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(s.TEXTURE_2D_ARRAY,O.__webglTexture,s.TEXTURE0+v)}function ie(A,v){const O=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&O.__version!==A.version){Ce(O,A,v);return}t.bindTexture(s.TEXTURE_3D,O.__webglTexture,s.TEXTURE0+v)}function se(A,v){const O=i.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&O.__version!==A.version){Ne(O,A,v);return}t.bindTexture(s.TEXTURE_CUBE_MAP,O.__webglTexture,s.TEXTURE0+v)}const ge={[Ur]:s.REPEAT,[Ti]:s.CLAMP_TO_EDGE,[ja]:s.MIRRORED_REPEAT},be={[Ft]:s.NEAREST,[uu]:s.NEAREST_MIPMAP_NEAREST,[Hs]:s.NEAREST_MIPMAP_LINEAR,[Gt]:s.LINEAR,[ia]:s.LINEAR_MIPMAP_NEAREST,[xn]:s.LINEAR_MIPMAP_LINEAR},He={[pu]:s.NEVER,[_u]:s.ALWAYS,[mu]:s.LESS,[Zo]:s.LEQUAL,[gu]:s.EQUAL,[Jo]:s.GEQUAL,[vu]:s.GREATER,[xu]:s.NOTEQUAL};function Ye(A,v){if(v.type===mi&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Gt||v.magFilter===ia||v.magFilter===Hs||v.magFilter===xn||v.minFilter===Gt||v.minFilter===ia||v.minFilter===Hs||v.minFilter===xn)&&Ue("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(A,s.TEXTURE_WRAP_S,ge[v.wrapS]),s.texParameteri(A,s.TEXTURE_WRAP_T,ge[v.wrapT]),(A===s.TEXTURE_3D||A===s.TEXTURE_2D_ARRAY)&&s.texParameteri(A,s.TEXTURE_WRAP_R,ge[v.wrapR]),s.texParameteri(A,s.TEXTURE_MAG_FILTER,be[v.magFilter]),s.texParameteri(A,s.TEXTURE_MIN_FILTER,be[v.minFilter]),v.compareFunction&&(s.texParameteri(A,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(A,s.TEXTURE_COMPARE_FUNC,He[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Ft||v.minFilter!==Hs&&v.minFilter!==xn||v.type===mi&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const O=e.get("EXT_texture_filter_anisotropic");s.texParameterf(A,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,n.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function K(A,v){let O=!1;A.__webglInit===void 0&&(A.__webglInit=!0,v.addEventListener("dispose",R));const z=v.source;let q=m.get(z);q===void 0&&(q={},m.set(z,q));const ne=G(v);if(ne!==A.__cacheKey){q[ne]===void 0&&(q[ne]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,O=!0),q[ne].usedTimes++;const oe=q[A.__cacheKey];oe!==void 0&&(q[A.__cacheKey].usedTimes--,oe.usedTimes===0&&L(v)),A.__cacheKey=ne,A.__webglTexture=q[ne].texture}return O}function re(A,v,O){return Math.floor(Math.floor(A/O)/v)}function ee(A,v,O,z){const ne=A.updateRanges;if(ne.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,v.width,v.height,O,z,v.data);else{ne.sort((Ee,ue)=>Ee.start-ue.start);let oe=0;for(let Ee=1;Ee<ne.length;Ee++){const ue=ne[oe],ce=ne[Ee],Le=ue.start+ue.count,De=re(ce.start,v.width,4),Fe=re(ue.start,v.width,4);ce.start<=Le+1&&De===Fe&&re(ce.start+ce.count-1,v.width,4)===De?ue.count=Math.max(ue.count,ce.start+ce.count-ue.start):(++oe,ne[oe]=ce)}ne.length=oe+1;const Y=t.getParameter(s.UNPACK_ROW_LENGTH),J=t.getParameter(s.UNPACK_SKIP_PIXELS),le=t.getParameter(s.UNPACK_SKIP_ROWS);t.pixelStorei(s.UNPACK_ROW_LENGTH,v.width);for(let Ee=0,ue=ne.length;Ee<ue;Ee++){const ce=ne[Ee],Le=Math.floor(ce.start/4),De=Math.ceil(ce.count/4),Fe=Le%v.width,D=Math.floor(Le/v.width),ae=De,Z=1;t.pixelStorei(s.UNPACK_SKIP_PIXELS,Fe),t.pixelStorei(s.UNPACK_SKIP_ROWS,D),t.texSubImage2D(s.TEXTURE_2D,0,Fe,D,ae,Z,O,z,v.data)}A.clearUpdateRanges(),t.pixelStorei(s.UNPACK_ROW_LENGTH,Y),t.pixelStorei(s.UNPACK_SKIP_PIXELS,J),t.pixelStorei(s.UNPACK_SKIP_ROWS,le)}}function Ce(A,v,O){let z=s.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(z=s.TEXTURE_2D_ARRAY),v.isData3DTexture&&(z=s.TEXTURE_3D);const q=K(A,v),ne=v.source;t.bindTexture(z,A.__webglTexture,s.TEXTURE0+O);const oe=i.get(ne);if(ne.version!==oe.__version||q===!0){if(t.activeTexture(s.TEXTURE0+O),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){const Z=Xe.getPrimaries(Xe.workingColorSpace),he=v.colorSpace===tn?null:Xe.getPrimaries(v.colorSpace),me=v.colorSpace===tn||Z===he?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,me)}t.pixelStorei(s.UNPACK_ALIGNMENT,v.unpackAlignment);let J=f(v.image,!1,n.maxTextureSize);J=Kt(v,J);const le=r.convert(v.format,v.colorSpace),Ee=r.convert(v.type);let ue=S(v.internalFormat,le,Ee,v.normalized,v.colorSpace,v.isVideoTexture);Ye(z,v);let ce;const Le=v.mipmaps,De=v.isVideoTexture!==!0,Fe=oe.__version===void 0||q===!0,D=ne.dataReady,ae=b(v,J);if(v.isDepthTexture)ue=M(v.format===_n,v.type),Fe&&(De?t.texStorage2D(s.TEXTURE_2D,1,ue,J.width,J.height):t.texImage2D(s.TEXTURE_2D,0,ue,J.width,J.height,0,le,Ee,null));else if(v.isDataTexture)if(Le.length>0){De&&Fe&&t.texStorage2D(s.TEXTURE_2D,ae,ue,Le[0].width,Le[0].height);for(let Z=0,he=Le.length;Z<he;Z++)ce=Le[Z],De?D&&t.texSubImage2D(s.TEXTURE_2D,Z,0,0,ce.width,ce.height,le,Ee,ce.data):t.texImage2D(s.TEXTURE_2D,Z,ue,ce.width,ce.height,0,le,Ee,ce.data);v.generateMipmaps=!1}else De?(Fe&&t.texStorage2D(s.TEXTURE_2D,ae,ue,J.width,J.height),D&&ee(v,J,le,Ee)):t.texImage2D(s.TEXTURE_2D,0,ue,J.width,J.height,0,le,Ee,J.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){De&&Fe&&t.texStorage3D(s.TEXTURE_2D_ARRAY,ae,ue,Le[0].width,Le[0].height,J.depth);for(let Z=0,he=Le.length;Z<he;Z++)if(ce=Le[Z],v.format!==gi)if(le!==null)if(De){if(D)if(v.layerUpdates.size>0){const me=sc(ce.width,ce.height,v.format,v.type);for(const j of v.layerUpdates){const Me=ce.data.subarray(j*me/ce.data.BYTES_PER_ELEMENT,(j+1)*me/ce.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Z,0,0,j,ce.width,ce.height,1,le,Me)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Z,0,0,0,ce.width,ce.height,J.depth,le,ce.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,Z,ue,ce.width,ce.height,J.depth,0,ce.data,0,0);else Ue("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else De?D&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,Z,0,0,0,ce.width,ce.height,J.depth,le,Ee,ce.data):t.texImage3D(s.TEXTURE_2D_ARRAY,Z,ue,ce.width,ce.height,J.depth,0,le,Ee,ce.data)}else{De&&Fe&&t.texStorage2D(s.TEXTURE_2D,ae,ue,Le[0].width,Le[0].height);for(let Z=0,he=Le.length;Z<he;Z++)ce=Le[Z],v.format!==gi?le!==null?De?D&&t.compressedTexSubImage2D(s.TEXTURE_2D,Z,0,0,ce.width,ce.height,le,ce.data):t.compressedTexImage2D(s.TEXTURE_2D,Z,ue,ce.width,ce.height,0,ce.data):Ue("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):De?D&&t.texSubImage2D(s.TEXTURE_2D,Z,0,0,ce.width,ce.height,le,Ee,ce.data):t.texImage2D(s.TEXTURE_2D,Z,ue,ce.width,ce.height,0,le,Ee,ce.data)}else if(v.isDataArrayTexture)if(De){if(Fe&&t.texStorage3D(s.TEXTURE_2D_ARRAY,ae,ue,J.width,J.height,J.depth),D)if(v.layerUpdates.size>0){const Z=sc(J.width,J.height,v.format,v.type);for(const he of v.layerUpdates){const me=J.data.subarray(he*Z/J.data.BYTES_PER_ELEMENT,(he+1)*Z/J.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,he,J.width,J.height,1,le,Ee,me)}v.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,le,Ee,J.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,ue,J.width,J.height,J.depth,0,le,Ee,J.data);else if(v.isData3DTexture)De?(Fe&&t.texStorage3D(s.TEXTURE_3D,ae,ue,J.width,J.height,J.depth),D&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,le,Ee,J.data)):t.texImage3D(s.TEXTURE_3D,0,ue,J.width,J.height,J.depth,0,le,Ee,J.data);else if(v.isFramebufferTexture){if(Fe)if(De)t.texStorage2D(s.TEXTURE_2D,ae,ue,J.width,J.height);else{let Z=J.width,he=J.height;for(let me=0;me<ae;me++)t.texImage2D(s.TEXTURE_2D,me,ue,Z,he,0,le,Ee,null),Z>>=1,he>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in s){const Z=s.canvas;if(Z.hasAttribute("layoutsubtree")||Z.setAttribute("layoutsubtree","true"),J.parentNode!==Z){Z.appendChild(J),p.add(v),Z.onpaint=he=>{const me=he.changedElements;for(const j of p)me.includes(j.image)&&(j.needsUpdate=!0)},Z.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,J);else{const me=s.RGBA,j=s.RGBA,Me=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,me,j,Me,J)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(Le.length>0){if(De&&Fe){const Z=nt(Le[0]);t.texStorage2D(s.TEXTURE_2D,ae,ue,Z.width,Z.height)}for(let Z=0,he=Le.length;Z<he;Z++)ce=Le[Z],De?D&&t.texSubImage2D(s.TEXTURE_2D,Z,0,0,le,Ee,ce):t.texImage2D(s.TEXTURE_2D,Z,ue,le,Ee,ce);v.generateMipmaps=!1}else if(De){if(Fe){const Z=nt(J);t.texStorage2D(s.TEXTURE_2D,ae,ue,Z.width,Z.height)}D&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,le,Ee,J)}else t.texImage2D(s.TEXTURE_2D,0,ue,le,Ee,J);d(v)&&T(z),oe.__version=ne.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function Ne(A,v,O){if(v.image.length!==6)return;const z=K(A,v),q=v.source;t.bindTexture(s.TEXTURE_CUBE_MAP,A.__webglTexture,s.TEXTURE0+O);const ne=i.get(q);if(q.version!==ne.__version||z===!0){t.activeTexture(s.TEXTURE0+O);const oe=Xe.getPrimaries(Xe.workingColorSpace),Y=v.colorSpace===tn?null:Xe.getPrimaries(v.colorSpace),J=v.colorSpace===tn||oe===Y?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(s.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,J);const le=v.isCompressedTexture||v.image[0].isCompressedTexture,Ee=v.image[0]&&v.image[0].isDataTexture,ue=[];for(let j=0;j<6;j++)!le&&!Ee?ue[j]=f(v.image[j],!0,n.maxCubemapSize):ue[j]=Ee?v.image[j].image:v.image[j],ue[j]=Kt(v,ue[j]);const ce=ue[0],Le=r.convert(v.format,v.colorSpace),De=r.convert(v.type),Fe=S(v.internalFormat,Le,De,v.normalized,v.colorSpace),D=v.isVideoTexture!==!0,ae=ne.__version===void 0||z===!0,Z=q.dataReady;let he=b(v,ce);Ye(s.TEXTURE_CUBE_MAP,v);let me;if(le){D&&ae&&t.texStorage2D(s.TEXTURE_CUBE_MAP,he,Fe,ce.width,ce.height);for(let j=0;j<6;j++){me=ue[j].mipmaps;for(let Me=0;Me<me.length;Me++){const Se=me[Me];v.format!==gi?Le!==null?D?Z&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,Me,0,0,Se.width,Se.height,Le,Se.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,Me,Fe,Se.width,Se.height,0,Se.data):Ue("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?Z&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,Me,0,0,Se.width,Se.height,Le,De,Se.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,Me,Fe,Se.width,Se.height,0,Le,De,Se.data)}}}else{if(me=v.mipmaps,D&&ae){me.length>0&&he++;const j=nt(ue[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,he,Fe,j.width,j.height)}for(let j=0;j<6;j++)if(Ee){D?Z&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,ue[j].width,ue[j].height,Le,De,ue[j].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Fe,ue[j].width,ue[j].height,0,Le,De,ue[j].data);for(let Me=0;Me<me.length;Me++){const St=me[Me].image[j].image;D?Z&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,Me+1,0,0,St.width,St.height,Le,De,St.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,Me+1,Fe,St.width,St.height,0,Le,De,St.data)}}else{D?Z&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Le,De,ue[j]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Fe,Le,De,ue[j]);for(let Me=0;Me<me.length;Me++){const Se=me[Me];D?Z&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,Me+1,0,0,Le,De,Se.image[j]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,Me+1,Fe,Le,De,Se.image[j])}}}d(v)&&T(s.TEXTURE_CUBE_MAP),ne.__version=q.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function Pe(A,v,O,z,q,ne){const oe=r.convert(O.format,O.colorSpace),Y=r.convert(O.type),J=S(O.internalFormat,oe,Y,O.normalized,O.colorSpace),le=i.get(v),Ee=i.get(O);if(Ee.__renderTarget=v,!le.__hasExternalTextures){const ue=Math.max(1,v.width>>ne),ce=Math.max(1,v.height>>ne);q===s.TEXTURE_3D||q===s.TEXTURE_2D_ARRAY?t.texImage3D(q,ne,J,ue,ce,v.depth,0,oe,Y,null):t.texImage2D(q,ne,J,ue,ce,0,oe,Y,null)}t.bindFramebuffer(s.FRAMEBUFFER,A),wt(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,z,q,Ee.__webglTexture,0,_t(v)):(q===s.TEXTURE_2D||q>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&q<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,z,q,Ee.__webglTexture,ne),t.bindFramebuffer(s.FRAMEBUFFER,null)}function gt(A,v,O){if(s.bindRenderbuffer(s.RENDERBUFFER,A),v.depthBuffer){const z=v.depthTexture,q=z&&z.isDepthTexture?z.type:null,ne=M(v.stencilBuffer,q),oe=v.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;wt(v)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,_t(v),ne,v.width,v.height):O?s.renderbufferStorageMultisample(s.RENDERBUFFER,_t(v),ne,v.width,v.height):s.renderbufferStorage(s.RENDERBUFFER,ne,v.width,v.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,oe,s.RENDERBUFFER,A)}else{const z=v.textures;for(let q=0;q<z.length;q++){const ne=z[q],oe=r.convert(ne.format,ne.colorSpace),Y=r.convert(ne.type),J=S(ne.internalFormat,oe,Y,ne.normalized,ne.colorSpace);wt(v)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,_t(v),J,v.width,v.height):O?s.renderbufferStorageMultisample(s.RENDERBUFFER,_t(v),J,v.width,v.height):s.renderbufferStorage(s.RENDERBUFFER,J,v.width,v.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Ve(A,v,O){const z=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(s.FRAMEBUFFER,A),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const q=i.get(v.depthTexture);if(q.__renderTarget=v,(!q.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),z){if(q.__webglInit===void 0&&(q.__webglInit=!0,v.depthTexture.addEventListener("dispose",R)),q.__webglTexture===void 0){q.__webglTexture=s.createTexture(),t.bindTexture(s.TEXTURE_CUBE_MAP,q.__webglTexture),Ye(s.TEXTURE_CUBE_MAP,v.depthTexture);const le=r.convert(v.depthTexture.format),Ee=r.convert(v.depthTexture.type);let ue;v.depthTexture.format===zi?ue=s.DEPTH_COMPONENT24:v.depthTexture.format===_n&&(ue=s.DEPTH24_STENCIL8);for(let ce=0;ce<6;ce++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,ue,v.width,v.height,0,le,Ee,null)}}else $(v.depthTexture,0);const ne=q.__webglTexture,oe=_t(v),Y=z?s.TEXTURE_CUBE_MAP_POSITIVE_X+O:s.TEXTURE_2D,J=v.depthTexture.format===_n?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(v.depthTexture.format===zi)wt(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,J,Y,ne,0,oe):s.framebufferTexture2D(s.FRAMEBUFFER,J,Y,ne,0);else if(v.depthTexture.format===_n)wt(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,J,Y,ne,0,oe):s.framebufferTexture2D(s.FRAMEBUFFER,J,Y,ne,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function tt(A){const v=i.get(A),O=A.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==A.depthTexture){const z=A.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),z){const q=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,z.removeEventListener("dispose",q)};z.addEventListener("dispose",q),v.__depthDisposeCallback=q}v.__boundDepthTexture=z}if(A.depthTexture&&!v.__autoAllocateDepthBuffer)if(O)for(let z=0;z<6;z++)Ve(v.__webglFramebuffer[z],A,z);else{const z=A.texture.mipmaps;z&&z.length>0?Ve(v.__webglFramebuffer[0],A,0):Ve(v.__webglFramebuffer,A,0)}else if(O){v.__webglDepthbuffer=[];for(let z=0;z<6;z++)if(t.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer[z]),v.__webglDepthbuffer[z]===void 0)v.__webglDepthbuffer[z]=s.createRenderbuffer(),gt(v.__webglDepthbuffer[z],A,!1);else{const q=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ne=v.__webglDepthbuffer[z];s.bindRenderbuffer(s.RENDERBUFFER,ne),s.framebufferRenderbuffer(s.FRAMEBUFFER,q,s.RENDERBUFFER,ne)}}else{const z=A.texture.mipmaps;if(z&&z.length>0?t.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=s.createRenderbuffer(),gt(v.__webglDepthbuffer,A,!1);else{const q=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ne=v.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,ne),s.framebufferRenderbuffer(s.FRAMEBUFFER,q,s.RENDERBUFFER,ne)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function je(A,v,O){const z=i.get(A);v!==void 0&&Pe(z.__webglFramebuffer,A,A.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),O!==void 0&&tt(A)}function Ge(A){const v=A.texture,O=i.get(A),z=i.get(v);A.addEventListener("dispose",_);const q=A.textures,ne=A.isWebGLCubeRenderTarget===!0,oe=q.length>1;if(oe||(z.__webglTexture===void 0&&(z.__webglTexture=s.createTexture()),z.__version=v.version,a.memory.textures++),ne){O.__webglFramebuffer=[];for(let Y=0;Y<6;Y++)if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer[Y]=[];for(let J=0;J<v.mipmaps.length;J++)O.__webglFramebuffer[Y][J]=s.createFramebuffer()}else O.__webglFramebuffer[Y]=s.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer=[];for(let Y=0;Y<v.mipmaps.length;Y++)O.__webglFramebuffer[Y]=s.createFramebuffer()}else O.__webglFramebuffer=s.createFramebuffer();if(oe)for(let Y=0,J=q.length;Y<J;Y++){const le=i.get(q[Y]);le.__webglTexture===void 0&&(le.__webglTexture=s.createTexture(),a.memory.textures++)}if(A.samples>0&&wt(A)===!1){O.__webglMultisampledFramebuffer=s.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let Y=0;Y<q.length;Y++){const J=q[Y];O.__webglColorRenderbuffer[Y]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,O.__webglColorRenderbuffer[Y]);const le=r.convert(J.format,J.colorSpace),Ee=r.convert(J.type),ue=S(J.internalFormat,le,Ee,J.normalized,J.colorSpace,A.isXRRenderTarget===!0),ce=_t(A);s.renderbufferStorageMultisample(s.RENDERBUFFER,ce,ue,A.width,A.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Y,s.RENDERBUFFER,O.__webglColorRenderbuffer[Y])}s.bindRenderbuffer(s.RENDERBUFFER,null),A.depthBuffer&&(O.__webglDepthRenderbuffer=s.createRenderbuffer(),gt(O.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ne){t.bindTexture(s.TEXTURE_CUBE_MAP,z.__webglTexture),Ye(s.TEXTURE_CUBE_MAP,v);for(let Y=0;Y<6;Y++)if(v.mipmaps&&v.mipmaps.length>0)for(let J=0;J<v.mipmaps.length;J++)Pe(O.__webglFramebuffer[Y][J],A,v,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,J);else Pe(O.__webglFramebuffer[Y],A,v,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0);d(v)&&T(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(oe){for(let Y=0,J=q.length;Y<J;Y++){const le=q[Y],Ee=i.get(le);let ue=s.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ue=A.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(ue,Ee.__webglTexture),Ye(ue,le),Pe(O.__webglFramebuffer,A,le,s.COLOR_ATTACHMENT0+Y,ue,0),d(le)&&T(ue)}t.unbindTexture()}else{let Y=s.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(Y=A.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(Y,z.__webglTexture),Ye(Y,v),v.mipmaps&&v.mipmaps.length>0)for(let J=0;J<v.mipmaps.length;J++)Pe(O.__webglFramebuffer[J],A,v,s.COLOR_ATTACHMENT0,Y,J);else Pe(O.__webglFramebuffer,A,v,s.COLOR_ATTACHMENT0,Y,0);d(v)&&T(Y),t.unbindTexture()}A.depthBuffer&&tt(A)}function vt(A){const v=A.textures;for(let O=0,z=v.length;O<z;O++){const q=v[O];if(d(q)){const ne=E(A),oe=i.get(q).__webglTexture;t.bindTexture(ne,oe),T(ne),t.unbindTexture()}}}const ft=[],Mt=[];function Ut(A){if(A.samples>0){if(wt(A)===!1){const v=A.textures,O=A.width,z=A.height;let q=s.COLOR_BUFFER_BIT;const ne=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,oe=i.get(A),Y=v.length>1;if(Y)for(let le=0;le<v.length;le++)t.bindFramebuffer(s.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+le,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,oe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+le,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer);const J=A.texture.mipmaps;J&&J.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,oe.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let le=0;le<v.length;le++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(q|=s.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(q|=s.STENCIL_BUFFER_BIT)),Y){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,oe.__webglColorRenderbuffer[le]);const Ee=i.get(v[le]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Ee,0)}s.blitFramebuffer(0,0,O,z,0,0,O,z,q,s.NEAREST),c===!0&&(ft.length=0,Mt.length=0,ft.push(s.COLOR_ATTACHMENT0+le),A.depthBuffer&&A.resolveDepthBuffer===!1&&(ft.push(ne),Mt.push(ne),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,Mt)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,ft))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Y)for(let le=0;le<v.length;le++){t.bindFramebuffer(s.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+le,s.RENDERBUFFER,oe.__webglColorRenderbuffer[le]);const Ee=i.get(v[le]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,oe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+le,s.TEXTURE_2D,Ee,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&c){const v=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[v])}}}function _t(A){return Math.min(n.maxSamples,A.samples)}function wt(A){const v=i.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function N(A){const v=a.render.frame;h.get(A)!==v&&(h.set(A,v),A.update())}function Kt(A,v){const O=A.colorSpace,z=A.format,q=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||O!==Br&&O!==tn&&(Xe.getTransfer(O)===st?(z!==gi||q!==si)&&Ue("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):$e("WebGLTextures: Unsupported texture color space:",O)),v}function nt(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=W,this.resetTextureUnits=H,this.getTextureUnits=X,this.setTextureUnits=F,this.setTexture2D=$,this.setTexture2DArray=Q,this.setTexture3D=ie,this.setTextureCube=se,this.rebindTextures=je,this.setupRenderTarget=Ge,this.updateRenderTargetMipmap=vt,this.updateMultisampleRenderTarget=Ut,this.setupDepthRenderbuffer=tt,this.setupFrameBufferTexture=Pe,this.useMultisampledRTT=wt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Jg(s,e){function t(i,n=tn){let r;const a=Xe.getTransfer(n);if(i===si)return s.UNSIGNED_BYTE;if(i===Wo)return s.UNSIGNED_SHORT_4_4_4_4;if(i===Xo)return s.UNSIGNED_SHORT_5_5_5_1;if(i===Jc)return s.UNSIGNED_INT_5_9_9_9_REV;if(i===Qc)return s.UNSIGNED_INT_10F_11F_11F_REV;if(i===Kc)return s.BYTE;if(i===Zc)return s.SHORT;if(i===Is)return s.UNSIGNED_SHORT;if(i===Go)return s.INT;if(i===Ci)return s.UNSIGNED_INT;if(i===mi)return s.FLOAT;if(i===ri)return s.HALF_FLOAT;if(i===jc)return s.ALPHA;if(i===eh)return s.RGB;if(i===gi)return s.RGBA;if(i===zi)return s.DEPTH_COMPONENT;if(i===_n)return s.DEPTH_STENCIL;if(i===qo)return s.RED;if(i===Yo)return s.RED_INTEGER;if(i===Mn)return s.RG;if(i===$o)return s.RG_INTEGER;if(i===Ko)return s.RGBA_INTEGER;if(i===Rr||i===Cr||i===Pr||i===Lr)if(a===st)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Rr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Cr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Pr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Lr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Rr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Cr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Pr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Lr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===eo||i===to||i===io||i===no)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===eo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===to)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===io)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===no)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===so||i===ro||i===ao||i===oo||i===lo||i===Or||i===co)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===so||i===ro)return a===st?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===ao)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===oo)return r.COMPRESSED_R11_EAC;if(i===lo)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Or)return r.COMPRESSED_RG11_EAC;if(i===co)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===ho||i===uo||i===fo||i===po||i===mo||i===go||i===vo||i===xo||i===_o||i===So||i===yo||i===Mo||i===bo||i===Eo)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===ho)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===uo)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===fo)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===po)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===mo)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===go)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===vo)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===xo)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===_o)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===So)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===yo)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Mo)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===bo)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Eo)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===To||i===wo||i===Ao)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===To)return a===st?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===wo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ao)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Ro||i===Co||i===Fr||i===Po)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===Ro)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Co)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Fr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Po)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ds?s.UNSIGNED_INT_24_8:s[i]!==void 0?s[i]:null}return{convert:t}}const Qg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,jg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class e0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new dh(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new et({vertexShader:Qg,fragmentShader:jg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new rt(new Fs(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class t0 extends bn{constructor(e,t){super();const i=this;let n=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,p=null,u=null,m=null,g=null;const x=typeof XRWebGLBinding<"u",f=new e0,d={},T=t.getContextAttributes();let E=null,S=null;const M=[],b=[],R=new we;let _=null;const w=new ni;w.viewport=new dt;const L=new ni;L.viewport=new dt;const C=[w,L],I=new ld;let H=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let re=M[K];return re===void 0&&(re=new ha,M[K]=re),re.getTargetRaySpace()},this.getControllerGrip=function(K){let re=M[K];return re===void 0&&(re=new ha,M[K]=re),re.getGripSpace()},this.getHand=function(K){let re=M[K];return re===void 0&&(re=new ha,M[K]=re),re.getHandSpace()};function F(K){const re=b.indexOf(K.inputSource);if(re===-1)return;const ee=M[re];ee!==void 0&&(ee.update(K.inputSource,K.frame,l||a),ee.dispatchEvent({type:K.type,data:K.inputSource}))}function W(){n.removeEventListener("select",F),n.removeEventListener("selectstart",F),n.removeEventListener("selectend",F),n.removeEventListener("squeeze",F),n.removeEventListener("squeezestart",F),n.removeEventListener("squeezeend",F),n.removeEventListener("end",W),n.removeEventListener("inputsourceschange",G);for(let K=0;K<M.length;K++){const re=b[K];re!==null&&(b[K]=null,M[K].disconnect(re))}H=null,X=null,f.reset();for(const K in d)delete d[K];e.setRenderTarget(E),m=null,u=null,p=null,n=null,S=null,Ye.stop(),i.isPresenting=!1,e.setPixelRatio(_),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,i.isPresenting===!0&&Ue("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,i.isPresenting===!0&&Ue("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(K){l=K},this.getBaseLayer=function(){return u!==null?u:m},this.getBinding=function(){return p===null&&x&&(p=new XRWebGLBinding(n,t)),p},this.getFrame=function(){return g},this.getSession=function(){return n},this.setSession=async function(K){if(n=K,n!==null){if(E=e.getRenderTarget(),n.addEventListener("select",F),n.addEventListener("selectstart",F),n.addEventListener("selectend",F),n.addEventListener("squeeze",F),n.addEventListener("squeezestart",F),n.addEventListener("squeezeend",F),n.addEventListener("end",W),n.addEventListener("inputsourceschange",G),T.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(R),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let ee=null,Ce=null,Ne=null;T.depth&&(Ne=T.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=T.stencil?_n:zi,Ce=T.stencil?Ds:Ci);const Pe={colorFormat:t.RGBA8,depthFormat:Ne,scaleFactor:r};p=this.getBinding(),u=p.createProjectionLayer(Pe),n.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),S=new Jt(u.textureWidth,u.textureHeight,{format:gi,type:si,depthTexture:new os(u.textureWidth,u.textureHeight,Ce,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:T.stencil,colorSpace:e.outputColorSpace,samples:T.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const ee={antialias:T.antialias,alpha:!0,depth:T.depth,stencil:T.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(n,t,ee),n.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),S=new Jt(m.framebufferWidth,m.framebufferHeight,{format:gi,type:si,colorSpace:e.outputColorSpace,stencilBuffer:T.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await n.requestReferenceSpace(o),Ye.setContext(n),Ye.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};function G(K){for(let re=0;re<K.removed.length;re++){const ee=K.removed[re],Ce=b.indexOf(ee);Ce>=0&&(b[Ce]=null,M[Ce].disconnect(ee))}for(let re=0;re<K.added.length;re++){const ee=K.added[re];let Ce=b.indexOf(ee);if(Ce===-1){for(let Pe=0;Pe<M.length;Pe++)if(Pe>=b.length){b.push(ee),Ce=Pe;break}else if(b[Pe]===null){b[Pe]=ee,Ce=Pe;break}if(Ce===-1)break}const Ne=M[Ce];Ne&&Ne.connect(ee)}}const $=new P,Q=new P;function ie(K,re,ee){$.setFromMatrixPosition(re.matrixWorld),Q.setFromMatrixPosition(ee.matrixWorld);const Ce=$.distanceTo(Q),Ne=re.projectionMatrix.elements,Pe=ee.projectionMatrix.elements,gt=Ne[14]/(Ne[10]-1),Ve=Ne[14]/(Ne[10]+1),tt=(Ne[9]+1)/Ne[5],je=(Ne[9]-1)/Ne[5],Ge=(Ne[8]-1)/Ne[0],vt=(Pe[8]+1)/Pe[0],ft=gt*Ge,Mt=gt*vt,Ut=Ce/(-Ge+vt),_t=Ut*-Ge;if(re.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(_t),K.translateZ(Ut),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),Ne[10]===-1)K.projectionMatrix.copy(re.projectionMatrix),K.projectionMatrixInverse.copy(re.projectionMatrixInverse);else{const wt=gt+Ut,N=Ve+Ut,Kt=ft-_t,nt=Mt+(Ce-_t),A=tt*Ve/N*wt,v=je*Ve/N*wt;K.projectionMatrix.makePerspective(Kt,nt,A,v,wt,N),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function se(K,re){re===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(re.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(n===null)return;let re=K.near,ee=K.far;f.texture!==null&&(f.depthNear>0&&(re=f.depthNear),f.depthFar>0&&(ee=f.depthFar)),I.near=L.near=w.near=re,I.far=L.far=w.far=ee,(H!==I.near||X!==I.far)&&(n.updateRenderState({depthNear:I.near,depthFar:I.far}),H=I.near,X=I.far),I.layers.mask=K.layers.mask|6,w.layers.mask=I.layers.mask&-5,L.layers.mask=I.layers.mask&-3;const Ce=K.parent,Ne=I.cameras;se(I,Ce);for(let Pe=0;Pe<Ne.length;Pe++)se(Ne[Pe],Ce);Ne.length===2?ie(I,w,L):I.projectionMatrix.copy(w.projectionMatrix),ge(K,I,Ce)};function ge(K,re,ee){ee===null?K.matrix.copy(re.matrixWorld):(K.matrix.copy(ee.matrixWorld),K.matrix.invert(),K.matrix.multiply(re.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(re.projectionMatrix),K.projectionMatrixInverse.copy(re.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=Do*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(u===null&&m===null))return c},this.setFoveation=function(K){c=K,u!==null&&(u.fixedFoveation=K),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=K)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(I)},this.getCameraTexture=function(K){return d[K]};let be=null;function He(K,re){if(h=re.getViewerPose(l||a),g=re,h!==null){const ee=h.views;m!==null&&(e.setRenderTargetFramebuffer(S,m.framebuffer),e.setRenderTarget(S));let Ce=!1;ee.length!==I.cameras.length&&(I.cameras.length=0,Ce=!0);for(let Ve=0;Ve<ee.length;Ve++){const tt=ee[Ve];let je=null;if(m!==null)je=m.getViewport(tt);else{const vt=p.getViewSubImage(u,tt);je=vt.viewport,Ve===0&&(e.setRenderTargetTextures(S,vt.colorTexture,vt.depthStencilTexture),e.setRenderTarget(S))}let Ge=C[Ve];Ge===void 0&&(Ge=new ni,Ge.layers.enable(Ve),Ge.viewport=new dt,C[Ve]=Ge),Ge.matrix.fromArray(tt.transform.matrix),Ge.matrix.decompose(Ge.position,Ge.quaternion,Ge.scale),Ge.projectionMatrix.fromArray(tt.projectionMatrix),Ge.projectionMatrixInverse.copy(Ge.projectionMatrix).invert(),Ge.viewport.set(je.x,je.y,je.width,je.height),Ve===0&&(I.matrix.copy(Ge.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),Ce===!0&&I.cameras.push(Ge)}const Ne=n.enabledFeatures;if(Ne&&Ne.includes("depth-sensing")&&n.depthUsage=="gpu-optimized"&&x){p=i.getBinding();const Ve=p.getDepthInformation(ee[0]);Ve&&Ve.isValid&&Ve.texture&&f.init(Ve,n.renderState)}if(Ne&&Ne.includes("camera-access")&&x){e.state.unbindTexture(),p=i.getBinding();for(let Ve=0;Ve<ee.length;Ve++){const tt=ee[Ve].camera;if(tt){let je=d[tt];je||(je=new dh,d[tt]=je);const Ge=p.getCameraImage(tt);je.sourceTexture=Ge}}}}for(let ee=0;ee<M.length;ee++){const Ce=b[ee],Ne=M[ee];Ce!==null&&Ne!==void 0&&Ne.update(Ce,re,l||a)}be&&be(K,re),re.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:re}),g=null}const Ye=new vh;Ye.setAnimationLoop(He),this.setAnimationLoop=function(K){be=K},this.dispose=function(){}}}const i0=new at,Eh=new Oe;Eh.set(-1,0,0,0,1,0,0,0,1);function n0(s,e){function t(f,d){f.matrixAutoUpdate===!0&&f.updateMatrix(),d.value.copy(f.matrix)}function i(f,d){d.color.getRGB(f.fogColor.value,fh(s)),d.isFog?(f.fogNear.value=d.near,f.fogFar.value=d.far):d.isFogExp2&&(f.fogDensity.value=d.density)}function n(f,d,T,E,S){d.isNodeMaterial?d.uniformsNeedUpdate=!1:d.isMeshBasicMaterial?r(f,d):d.isMeshLambertMaterial?(r(f,d),d.envMap&&(f.envMapIntensity.value=d.envMapIntensity)):d.isMeshToonMaterial?(r(f,d),p(f,d)):d.isMeshPhongMaterial?(r(f,d),h(f,d),d.envMap&&(f.envMapIntensity.value=d.envMapIntensity)):d.isMeshStandardMaterial?(r(f,d),u(f,d),d.isMeshPhysicalMaterial&&m(f,d,S)):d.isMeshMatcapMaterial?(r(f,d),g(f,d)):d.isMeshDepthMaterial?r(f,d):d.isMeshDistanceMaterial?(r(f,d),x(f,d)):d.isMeshNormalMaterial?r(f,d):d.isLineBasicMaterial?(a(f,d),d.isLineDashedMaterial&&o(f,d)):d.isPointsMaterial?c(f,d,T,E):d.isSpriteMaterial?l(f,d):d.isShadowMaterial?(f.color.value.copy(d.color),f.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(f,d){f.opacity.value=d.opacity,d.color&&f.diffuse.value.copy(d.color),d.emissive&&f.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(f.map.value=d.map,t(d.map,f.mapTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,t(d.alphaMap,f.alphaMapTransform)),d.bumpMap&&(f.bumpMap.value=d.bumpMap,t(d.bumpMap,f.bumpMapTransform),f.bumpScale.value=d.bumpScale,d.side===$t&&(f.bumpScale.value*=-1)),d.normalMap&&(f.normalMap.value=d.normalMap,t(d.normalMap,f.normalMapTransform),f.normalScale.value.copy(d.normalScale),d.side===$t&&f.normalScale.value.negate()),d.displacementMap&&(f.displacementMap.value=d.displacementMap,t(d.displacementMap,f.displacementMapTransform),f.displacementScale.value=d.displacementScale,f.displacementBias.value=d.displacementBias),d.emissiveMap&&(f.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,f.emissiveMapTransform)),d.specularMap&&(f.specularMap.value=d.specularMap,t(d.specularMap,f.specularMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest);const T=e.get(d),E=T.envMap,S=T.envMapRotation;E&&(f.envMap.value=E,f.envMapRotation.value.setFromMatrix4(i0.makeRotationFromEuler(S)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&f.envMapRotation.value.premultiply(Eh),f.reflectivity.value=d.reflectivity,f.ior.value=d.ior,f.refractionRatio.value=d.refractionRatio),d.lightMap&&(f.lightMap.value=d.lightMap,f.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,f.lightMapTransform)),d.aoMap&&(f.aoMap.value=d.aoMap,f.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,f.aoMapTransform))}function a(f,d){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,d.map&&(f.map.value=d.map,t(d.map,f.mapTransform))}function o(f,d){f.dashSize.value=d.dashSize,f.totalSize.value=d.dashSize+d.gapSize,f.scale.value=d.scale}function c(f,d,T,E){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,f.size.value=d.size*T,f.scale.value=E*.5,d.map&&(f.map.value=d.map,t(d.map,f.uvTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,t(d.alphaMap,f.alphaMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest)}function l(f,d){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,f.rotation.value=d.rotation,d.map&&(f.map.value=d.map,t(d.map,f.mapTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,t(d.alphaMap,f.alphaMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest)}function h(f,d){f.specular.value.copy(d.specular),f.shininess.value=Math.max(d.shininess,1e-4)}function p(f,d){d.gradientMap&&(f.gradientMap.value=d.gradientMap)}function u(f,d){f.metalness.value=d.metalness,d.metalnessMap&&(f.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,f.metalnessMapTransform)),f.roughness.value=d.roughness,d.roughnessMap&&(f.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,f.roughnessMapTransform)),d.envMap&&(f.envMapIntensity.value=d.envMapIntensity)}function m(f,d,T){f.ior.value=d.ior,d.sheen>0&&(f.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),f.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(f.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,f.sheenColorMapTransform)),d.sheenRoughnessMap&&(f.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,f.sheenRoughnessMapTransform))),d.clearcoat>0&&(f.clearcoat.value=d.clearcoat,f.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(f.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,f.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(f.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===$t&&f.clearcoatNormalScale.value.negate())),d.dispersion>0&&(f.dispersion.value=d.dispersion),d.iridescence>0&&(f.iridescence.value=d.iridescence,f.iridescenceIOR.value=d.iridescenceIOR,f.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(f.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,f.iridescenceMapTransform)),d.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),d.transmission>0&&(f.transmission.value=d.transmission,f.transmissionSamplerMap.value=T.texture,f.transmissionSamplerSize.value.set(T.width,T.height),d.transmissionMap&&(f.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,f.transmissionMapTransform)),f.thickness.value=d.thickness,d.thicknessMap&&(f.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=d.attenuationDistance,f.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(f.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(f.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=d.specularIntensity,f.specularColor.value.copy(d.specularColor),d.specularColorMap&&(f.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,f.specularColorMapTransform)),d.specularIntensityMap&&(f.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,f.specularIntensityMapTransform))}function g(f,d){d.matcap&&(f.matcap.value=d.matcap)}function x(f,d){const T=e.get(d).light;f.referencePosition.value.setFromMatrixPosition(T.matrixWorld),f.nearDistance.value=T.shadow.camera.near,f.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function s0(s,e,t,i){let n={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function c(S,M){const b=M.program;i.uniformBlockBinding(S,b)}function l(S,M){let b=n[S.id];b===void 0&&(f(S),b=h(S),n[S.id]=b,S.addEventListener("dispose",T));const R=M.program;i.updateUBOMapping(S,R);const _=e.render.frame;r[S.id]!==_&&(u(S),r[S.id]=_)}function h(S){const M=p();S.__bindingPointIndex=M;const b=s.createBuffer(),R=S.__size,_=S.usage;return s.bindBuffer(s.UNIFORM_BUFFER,b),s.bufferData(s.UNIFORM_BUFFER,R,_),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,M,b),b}function p(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return $e("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(S){const M=n[S.id],b=S.uniforms,R=S.__cache;s.bindBuffer(s.UNIFORM_BUFFER,M);for(let _=0,w=b.length;_<w;_++){const L=b[_];if(Array.isArray(L))for(let C=0,I=L.length;C<I;C++)m(L[C],_,C,R);else m(L,_,0,R)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function m(S,M,b,R){if(x(S,M,b,R)===!0){const _=S.__offset,w=S.value;if(Array.isArray(w)){let L=0;for(let C=0;C<w.length;C++){const I=w[C],H=d(I);g(I,S.__data,L),typeof I!="number"&&typeof I!="boolean"&&!I.isMatrix3&&!ArrayBuffer.isView(I)&&(L+=H.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(w,S.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,_,S.__data)}}function g(S,M,b){typeof S=="number"||typeof S=="boolean"?M[0]=S:S.isMatrix3?(M[0]=S.elements[0],M[1]=S.elements[1],M[2]=S.elements[2],M[3]=0,M[4]=S.elements[3],M[5]=S.elements[4],M[6]=S.elements[5],M[7]=0,M[8]=S.elements[6],M[9]=S.elements[7],M[10]=S.elements[8],M[11]=0):ArrayBuffer.isView(S)?M.set(new S.constructor(S.buffer,S.byteOffset,M.length)):S.toArray(M,b)}function x(S,M,b,R){const _=S.value,w=M+"_"+b;if(R[w]===void 0)return typeof _=="number"||typeof _=="boolean"?R[w]=_:ArrayBuffer.isView(_)?R[w]=_.slice():R[w]=_.clone(),!0;{const L=R[w];if(typeof _=="number"||typeof _=="boolean"){if(L!==_)return R[w]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(L.equals(_)===!1)return L.copy(_),!0}}return!1}function f(S){const M=S.uniforms;let b=0;const R=16;for(let w=0,L=M.length;w<L;w++){const C=Array.isArray(M[w])?M[w]:[M[w]];for(let I=0,H=C.length;I<H;I++){const X=C[I],F=Array.isArray(X.value)?X.value:[X.value];for(let W=0,G=F.length;W<G;W++){const $=F[W],Q=d($),ie=b%R,se=ie%Q.boundary,ge=ie+se;b+=se,ge!==0&&R-ge<Q.storage&&(b+=R-ge),X.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=b,b+=Q.storage}}}const _=b%R;return _>0&&(b+=R-_),S.__size=b,S.__cache={},this}function d(S){const M={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(M.boundary=4,M.storage=4):S.isVector2?(M.boundary=8,M.storage=8):S.isVector3||S.isColor?(M.boundary=16,M.storage=12):S.isVector4?(M.boundary=16,M.storage=16):S.isMatrix3?(M.boundary=48,M.storage=48):S.isMatrix4?(M.boundary=64,M.storage=64):S.isTexture?Ue("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(M.boundary=16,M.storage=S.byteLength):Ue("WebGLRenderer: Unsupported uniform value type.",S),M}function T(S){const M=S.target;M.removeEventListener("dispose",T);const b=a.indexOf(M.__bindingPointIndex);a.splice(b,1),s.deleteBuffer(n[M.id]),delete n[M.id],delete r[M.id]}function E(){for(const S in n)s.deleteBuffer(n[S]);a=[],n={},r={}}return{bind:c,update:l,dispose:E}}const r0=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let yi=null;function a0(){return yi===null&&(yi=new lh(r0,16,16,Mn,ri),yi.name="DFG_LUT",yi.minFilter=Gt,yi.magFilter=Gt,yi.wrapS=Ti,yi.wrapT=Ti,yi.generateMipmaps=!1,yi.needsUpdate=!0),yi}class o0{constructor(e={}){const{canvas:t=Mu(),context:i=null,depth:n=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:u=!1,outputBufferType:m=si}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;const x=m,f=new Set([Ko,$o,Yo]),d=new Set([si,Ci,Is,Ds,Wo,Xo]),T=new Uint32Array(4),E=new Int32Array(4),S=new P;let M=null,b=null;const R=[],_=[];let w=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ri,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const L=this;let C=!1,I=null,H=null,X=null,F=null;this._outputColorSpace=Vt;let W=0,G=0,$=null,Q=-1,ie=null;const se=new dt,ge=new dt;let be=null;const He=new te(0);let Ye=0,K=t.width,re=t.height,ee=1,Ce=null,Ne=null;const Pe=new dt(0,0,K,re),gt=new dt(0,0,K,re);let Ve=!1;const tt=new il;let je=!1,Ge=!1;const vt=new at,ft=new P,Mt=new dt,Ut={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let _t=!1;function wt(){return $===null?ee:1}let N=i;function Kt(y,U){return t.getContext(y,U)}try{const y={alpha:!0,depth:n,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:p};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ho}`),t.addEventListener("webglcontextlost",St,!1),t.addEventListener("webglcontextrestored",pt,!1),t.addEventListener("webglcontextcreationerror",vi,!1),N===null){const U="webgl2";if(N=Kt(U,y),N===null)throw Kt(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(y){throw $e("WebGLRenderer: "+y.message),y}let nt,A,v,O,z,q,ne,oe,Y,J,le,Ee,ue,ce,Le,De,Fe,D,ae,Z,he,me,j;function Me(){nt=new am(N),nt.init(),he=new Jg(N,nt),A=new Qp(N,nt,e,he),v=new Kg(N,nt),A.reversedDepthBuffer&&u&&v.buffers.depth.setReversed(!0),H=N.createFramebuffer(),X=N.createFramebuffer(),F=N.createFramebuffer(),O=new cm(N),z=new Ug,q=new Zg(N,nt,v,z,A,he,O),ne=new rm(L),oe=new dd(N),me=new Zp(N,oe),Y=new om(N,oe,O,me),J=new um(N,Y,oe,me,O),D=new hm(N,A,q),Le=new jp(z),le=new Ng(L,ne,nt,A,me,Le),Ee=new n0(L,z),ue=new Fg,ce=new Gg(nt),Fe=new Kp(L,ne,v,J,g,c),De=new $g(L,J,A),j=new s0(N,O,A,v),ae=new Jp(N,nt,O),Z=new lm(N,nt,O),O.programs=le.programs,L.capabilities=A,L.extensions=nt,L.properties=z,L.renderLists=ue,L.shadowMap=De,L.state=v,L.info=O}Me(),x!==si&&(w=new fm(x,t.width,t.height,o,n,r));const Se=new t0(L,N);this.xr=Se,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const y=nt.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=nt.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return ee},this.setPixelRatio=function(y){y!==void 0&&(ee=y,this.setSize(K,re,!1))},this.getSize=function(y){return y.set(K,re)},this.setSize=function(y,U,V=!0){if(Se.isPresenting){Ue("WebGLRenderer: Can't change size while VR device is presenting.");return}K=y,re=U,t.width=Math.floor(y*ee),t.height=Math.floor(U*ee),V===!0&&(t.style.width=y+"px",t.style.height=U+"px"),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,y,U)},this.getDrawingBufferSize=function(y){return y.set(K*ee,re*ee).floor()},this.setDrawingBufferSize=function(y,U,V){K=y,re=U,ee=V,t.width=Math.floor(y*V),t.height=Math.floor(U*V),this.setViewport(0,0,y,U)},this.setEffects=function(y){if(x===si){$e("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(y){for(let U=0;U<y.length;U++)if(y[U].isOutputPass===!0){Ue("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(y||[])},this.getCurrentViewport=function(y){return y.copy(se)},this.getViewport=function(y){return y.copy(Pe)},this.setViewport=function(y,U,V,B){y.isVector4?Pe.set(y.x,y.y,y.z,y.w):Pe.set(y,U,V,B),v.viewport(se.copy(Pe).multiplyScalar(ee).round())},this.getScissor=function(y){return y.copy(gt)},this.setScissor=function(y,U,V,B){y.isVector4?gt.set(y.x,y.y,y.z,y.w):gt.set(y,U,V,B),v.scissor(ge.copy(gt).multiplyScalar(ee).round())},this.getScissorTest=function(){return Ve},this.setScissorTest=function(y){v.setScissorTest(Ve=y)},this.setOpaqueSort=function(y){Ce=y},this.setTransparentSort=function(y){Ne=y},this.getClearColor=function(y){return y.copy(Fe.getClearColor())},this.setClearColor=function(){Fe.setClearColor(...arguments)},this.getClearAlpha=function(){return Fe.getClearAlpha()},this.setClearAlpha=function(){Fe.setClearAlpha(...arguments)},this.clear=function(y=!0,U=!0,V=!0){let B=0;if(y){let k=!1;if($!==null){const pe=$.texture.format;k=f.has(pe)}if(k){const pe=$.texture.type,_e=d.has(pe),fe=Fe.getClearColor(),ye=Fe.getClearAlpha(),Te=fe.r,Be=fe.g,ze=fe.b;_e?(T[0]=Te,T[1]=Be,T[2]=ze,T[3]=ye,N.clearBufferuiv(N.COLOR,0,T)):(E[0]=Te,E[1]=Be,E[2]=ze,E[3]=ye,N.clearBufferiv(N.COLOR,0,E))}else B|=N.COLOR_BUFFER_BIT}U&&(B|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),V&&(B|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B!==0&&N.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(y){y.setRenderer(this),I=y},this.dispose=function(){t.removeEventListener("webglcontextlost",St,!1),t.removeEventListener("webglcontextrestored",pt,!1),t.removeEventListener("webglcontextcreationerror",vi,!1),Fe.dispose(),ue.dispose(),ce.dispose(),z.dispose(),ne.dispose(),J.dispose(),me.dispose(),j.dispose(),le.dispose(),Se.dispose(),Se.removeEventListener("sessionstart",hl),Se.removeEventListener("sessionend",ul),on.stop()};function St(y){y.preventDefault(),Hr("WebGLRenderer: Context Lost."),C=!0}function pt(){Hr("WebGLRenderer: Context Restored."),C=!1;const y=O.autoReset,U=De.enabled,V=De.autoUpdate,B=De.needsUpdate,k=De.type;Me(),O.autoReset=y,De.enabled=U,De.autoUpdate=V,De.needsUpdate=B,De.type=k}function vi(y){$e("WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function xi(y){const U=y.target;U.removeEventListener("dispose",xi),Ph(U)}function Ph(y){Lh(y),z.remove(y)}function Lh(y){const U=z.get(y).programs;U!==void 0&&(U.forEach(function(V){le.releaseProgram(V)}),y.isShaderMaterial&&le.releaseShaderCache(y))}this.renderBufferDirect=function(y,U,V,B,k,pe){U===null&&(U=Ut);const _e=k.isMesh&&k.matrixWorld.determinantAffine()<0,fe=Nh(y,U,V,B,k);v.setMaterial(B,_e);let ye=V.index,Te=1;if(B.wireframe===!0){if(ye=Y.getWireframeAttribute(V),ye===void 0)return;Te=2}const Be=V.drawRange,ze=V.attributes.position;let Ae=Be.start*Te,ot=(Be.start+Be.count)*Te;pe!==null&&(Ae=Math.max(Ae,pe.start*Te),ot=Math.min(ot,(pe.start+pe.count)*Te)),ye!==null?(Ae=Math.max(Ae,0),ot=Math.min(ot,ye.count)):ze!=null&&(Ae=Math.max(Ae,0),ot=Math.min(ot,ze.count));const bt=ot-Ae;if(bt<0||bt===1/0)return;me.setup(k,B,fe,V,ye);let yt,ht=ae;if(ye!==null&&(yt=oe.get(ye),ht=Z,ht.setIndex(yt)),k.isMesh)B.wireframe===!0?(v.setLineWidth(B.wireframeLinewidth*wt()),ht.setMode(N.LINES)):ht.setMode(N.TRIANGLES);else if(k.isLine){let kt=B.linewidth;kt===void 0&&(kt=1),v.setLineWidth(kt*wt()),k.isLineSegments?ht.setMode(N.LINES):k.isLineLoop?ht.setMode(N.LINE_LOOP):ht.setMode(N.LINE_STRIP)}else k.isPoints?ht.setMode(N.POINTS):k.isSprite&&ht.setMode(N.TRIANGLES);if(k.isBatchedMesh)if(nt.get("WEBGL_multi_draw"))ht.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const kt=k._multiDrawStarts,xe=k._multiDrawCounts,Qt=k._multiDrawCount,Je=ye?oe.get(ye).bytesPerElement:1,ai=z.get(B).currentProgram.getUniforms();for(let _i=0;_i<Qt;_i++)ai.setValue(N,"_gl_DrawID",_i),ht.render(kt[_i]/Je,xe[_i])}else if(k.isInstancedMesh)ht.renderInstances(Ae,bt,k.count);else if(V.isInstancedBufferGeometry){const kt=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,xe=Math.min(V.instanceCount,kt);ht.renderInstances(Ae,bt,xe)}else ht.render(Ae,bt)};function cl(y,U,V){y.transparent===!0&&y.side===Ot&&y.forceSinglePass===!1?(y.side=$t,y.needsUpdate=!0,zs(y,U,V),y.side=ki,y.needsUpdate=!0,zs(y,U,V),y.side=Ot):zs(y,U,V)}this.compile=function(y,U,V=null){V===null&&(V=y),b=ce.get(V),b.init(U),_.push(b),V.traverseVisible(function(k){k.isLight&&k.layers.test(U.layers)&&(b.pushLight(k),k.castShadow&&b.pushShadow(k))}),y!==V&&y.traverseVisible(function(k){k.isLight&&k.layers.test(U.layers)&&(b.pushLight(k),k.castShadow&&b.pushShadow(k))}),b.setupLights();const B=new Set;return y.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const pe=k.material;if(pe)if(Array.isArray(pe))for(let _e=0;_e<pe.length;_e++){const fe=pe[_e];cl(fe,V,k),B.add(fe)}else cl(pe,V,k),B.add(pe)}),b=_.pop(),B},this.compileAsync=function(y,U,V=null){const B=this.compile(y,U,V);return new Promise(k=>{function pe(){if(B.forEach(function(_e){z.get(_e).currentProgram.isReady()&&B.delete(_e)}),B.size===0){k(y);return}setTimeout(pe,10)}nt.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let Zr=null;function Ih(y){Zr&&Zr(y)}function hl(){on.stop()}function ul(){on.start()}const on=new vh;on.setAnimationLoop(Ih),typeof self<"u"&&on.setContext(self),this.setAnimationLoop=function(y){Zr=y,Se.setAnimationLoop(y),y===null?on.stop():on.start()},Se.addEventListener("sessionstart",hl),Se.addEventListener("sessionend",ul),this.render=function(y,U){if(U!==void 0&&U.isCamera!==!0){$e("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;I!==null&&I.renderStart(y,U);const V=Se.enabled===!0&&Se.isPresenting===!0,B=w!==null&&($===null||V)&&w.begin(L,$);if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Se.enabled===!0&&Se.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Se.cameraAutoUpdate===!0&&Se.updateCamera(U),U=Se.getCamera()),y.isScene===!0&&y.onBeforeRender(L,y,U,$),b=ce.get(y,_.length),b.init(U),b.state.textureUnits=q.getTextureUnits(),_.push(b),vt.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),tt.setFromProjectionMatrix(vt,wi,U.reversedDepth),Ge=this.localClippingEnabled,je=Le.init(this.clippingPlanes,Ge),M=ue.get(y,R.length),M.init(),R.push(M),Se.enabled===!0&&Se.isPresenting===!0){const _e=L.xr.getDepthSensingMesh();_e!==null&&Jr(_e,U,-1/0,L.sortObjects)}Jr(y,U,0,L.sortObjects),M.finish(),L.sortObjects===!0&&M.sort(Ce,Ne,U.reversedDepth),_t=Se.enabled===!1||Se.isPresenting===!1||Se.hasDepthSensing()===!1,_t&&Fe.addToRenderList(M,y),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),je===!0&&Le.beginShadows();const k=b.state.shadowsArray;if(De.render(k,y,U),je===!0&&Le.endShadows(),(B&&w.hasRenderPass())===!1){const _e=M.opaque,fe=M.transmissive;if(b.setupLights(),U.isArrayCamera){const ye=U.cameras;if(fe.length>0)for(let Te=0,Be=ye.length;Te<Be;Te++){const ze=ye[Te];fl(_e,fe,y,ze)}_t&&Fe.render(y);for(let Te=0,Be=ye.length;Te<Be;Te++){const ze=ye[Te];dl(M,y,ze,ze.viewport)}}else fe.length>0&&fl(_e,fe,y,U),_t&&Fe.render(y),dl(M,y,U)}$!==null&&G===0&&(q.updateMultisampleRenderTarget($),q.updateRenderTargetMipmap($)),B&&w.end(L),y.isScene===!0&&y.onAfterRender(L,y,U),me.resetDefaultState(),Q=-1,ie=null,_.pop(),_.length>0?(b=_[_.length-1],q.setTextureUnits(b.state.textureUnits),je===!0&&Le.setGlobalState(L.clippingPlanes,b.state.camera)):b=null,R.pop(),R.length>0?M=R[R.length-1]:M=null,I!==null&&I.renderEnd()};function Jr(y,U,V,B){if(y.visible===!1)return;if(y.layers.test(U.layers)){if(y.isGroup)V=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(U);else if(y.isLightProbeGrid)b.pushLightProbeGrid(y);else if(y.isLight)b.pushLight(y),y.castShadow&&b.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||tt.intersectsSprite(y)){B&&Mt.setFromMatrixPosition(y.matrixWorld).applyMatrix4(vt);const _e=J.update(y),fe=y.material;fe.visible&&M.push(y,_e,fe,V,Mt.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||tt.intersectsObject(y))){const _e=J.update(y),fe=y.material;if(B&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Mt.copy(y.boundingSphere.center)):(_e.boundingSphere===null&&_e.computeBoundingSphere(),Mt.copy(_e.boundingSphere.center)),Mt.applyMatrix4(y.matrixWorld).applyMatrix4(vt)),Array.isArray(fe)){const ye=_e.groups;for(let Te=0,Be=ye.length;Te<Be;Te++){const ze=ye[Te],Ae=fe[ze.materialIndex];Ae&&Ae.visible&&M.push(y,_e,Ae,V,Mt.z,ze)}}else fe.visible&&M.push(y,_e,fe,V,Mt.z,null)}}const pe=y.children;for(let _e=0,fe=pe.length;_e<fe;_e++)Jr(pe[_e],U,V,B)}function dl(y,U,V,B){const{opaque:k,transmissive:pe,transparent:_e}=y;b.setupLightsView(V),je===!0&&Le.setGlobalState(L.clippingPlanes,V),B&&v.viewport(se.copy(B)),k.length>0&&ks(k,U,V),pe.length>0&&ks(pe,U,V),_e.length>0&&ks(_e,U,V),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function fl(y,U,V,B){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[B.id]===void 0){const Ae=nt.has("EXT_color_buffer_half_float")||nt.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[B.id]=new Jt(1,1,{generateMipmaps:!0,type:Ae?ri:si,minFilter:xn,samples:Math.max(4,A.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Xe.workingColorSpace})}const pe=b.state.transmissionRenderTarget[B.id],_e=B.viewport||se;pe.setSize(_e.z*L.transmissionResolutionScale,_e.w*L.transmissionResolutionScale);const fe=L.getRenderTarget(),ye=L.getActiveCubeFace(),Te=L.getActiveMipmapLevel();L.setRenderTarget(pe),L.getClearColor(He),Ye=L.getClearAlpha(),Ye<1&&L.setClearColor(16777215,.5),L.clear(),_t&&Fe.render(V);const Be=L.toneMapping;L.toneMapping=Ri;const ze=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),b.setupLightsView(B),je===!0&&Le.setGlobalState(L.clippingPlanes,B),ks(y,V,B),q.updateMultisampleRenderTarget(pe),q.updateRenderTargetMipmap(pe),nt.has("WEBGL_multisampled_render_to_texture")===!1){let Ae=!1;for(let ot=0,bt=U.length;ot<bt;ot++){const yt=U[ot],{object:ht,geometry:kt,material:xe,group:Qt}=yt;if(xe.side===Ot&&ht.layers.test(B.layers)){const Je=xe.side;xe.side=$t,xe.needsUpdate=!0,pl(ht,V,B,kt,xe,Qt),xe.side=Je,xe.needsUpdate=!0,Ae=!0}}Ae===!0&&(q.updateMultisampleRenderTarget(pe),q.updateRenderTargetMipmap(pe))}L.setRenderTarget(fe,ye,Te),L.setClearColor(He,Ye),ze!==void 0&&(B.viewport=ze),L.toneMapping=Be}function ks(y,U,V){const B=U.isScene===!0?U.overrideMaterial:null;for(let k=0,pe=y.length;k<pe;k++){const _e=y[k],{object:fe,geometry:ye,group:Te}=_e;let Be=_e.material;Be.allowOverride===!0&&B!==null&&(Be=B),fe.layers.test(V.layers)&&pl(fe,U,V,ye,Be,Te)}}function pl(y,U,V,B,k,pe){y.onBeforeRender(L,U,V,B,k,pe),y.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),k.onBeforeRender(L,U,V,B,y,pe),k.transparent===!0&&k.side===Ot&&k.forceSinglePass===!1?(k.side=$t,k.needsUpdate=!0,L.renderBufferDirect(V,U,B,k,y,pe),k.side=ki,k.needsUpdate=!0,L.renderBufferDirect(V,U,B,k,y,pe),k.side=Ot):L.renderBufferDirect(V,U,B,k,y,pe),y.onAfterRender(L,U,V,B,k,pe)}function zs(y,U,V){U.isScene!==!0&&(U=Ut);const B=z.get(y),k=b.state.lights,pe=b.state.shadowsArray,_e=k.state.version,fe=le.getParameters(y,k.state,pe,U,V,b.state.lightProbeGridArray),ye=le.getProgramCacheKey(fe);let Te=B.programs;B.environment=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?U.environment:null,B.fog=U.fog;const Be=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap;B.envMap=ne.get(y.envMap||B.environment,Be),B.envMapRotation=B.environment!==null&&y.envMap===null?U.environmentRotation:y.envMapRotation,Te===void 0&&(y.addEventListener("dispose",xi),Te=new Map,B.programs=Te);let ze=Te.get(ye);if(ze!==void 0){if(B.currentProgram===ze&&B.lightsStateVersion===_e)return gl(y,fe),ze}else fe.uniforms=le.getUniforms(y),I!==null&&y.isNodeMaterial&&I.build(y,V,fe),y.onBeforeCompile(fe,L),ze=le.acquireProgram(fe,ye),Te.set(ye,ze),B.uniforms=fe.uniforms;const Ae=B.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Ae.clippingPlanes=Le.uniform),gl(y,fe),B.needsLights=Oh(y),B.lightsStateVersion=_e,B.needsLights&&(Ae.ambientLightColor.value=k.state.ambient,Ae.lightProbe.value=k.state.probe,Ae.directionalLights.value=k.state.directional,Ae.directionalLightShadows.value=k.state.directionalShadow,Ae.spotLights.value=k.state.spot,Ae.spotLightShadows.value=k.state.spotShadow,Ae.rectAreaLights.value=k.state.rectArea,Ae.ltc_1.value=k.state.rectAreaLTC1,Ae.ltc_2.value=k.state.rectAreaLTC2,Ae.pointLights.value=k.state.point,Ae.pointLightShadows.value=k.state.pointShadow,Ae.hemisphereLights.value=k.state.hemi,Ae.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Ae.spotLightMatrix.value=k.state.spotLightMatrix,Ae.spotLightMap.value=k.state.spotLightMap,Ae.pointShadowMatrix.value=k.state.pointShadowMatrix),B.lightProbeGrid=b.state.lightProbeGridArray.length>0,B.currentProgram=ze,B.uniformsList=null,ze}function ml(y){if(y.uniformsList===null){const U=y.currentProgram.getUniforms();y.uniformsList=Ir.seqWithValue(U.seq,y.uniforms)}return y.uniformsList}function gl(y,U){const V=z.get(y);V.outputColorSpace=U.outputColorSpace,V.batching=U.batching,V.batchingColor=U.batchingColor,V.instancing=U.instancing,V.instancingColor=U.instancingColor,V.instancingMorph=U.instancingMorph,V.skinning=U.skinning,V.morphTargets=U.morphTargets,V.morphNormals=U.morphNormals,V.morphColors=U.morphColors,V.morphTargetsCount=U.morphTargetsCount,V.numClippingPlanes=U.numClippingPlanes,V.numIntersection=U.numClipIntersection,V.vertexAlphas=U.vertexAlphas,V.vertexTangents=U.vertexTangents,V.toneMapping=U.toneMapping}function Dh(y,U){if(y.length===0)return null;if(y.length===1)return y[0].texture!==null?y[0]:null;S.setFromMatrixPosition(U.matrixWorld);for(let V=0,B=y.length;V<B;V++){const k=y[V];if(k.texture!==null&&k.boundingBox.containsPoint(S))return k}return null}function Nh(y,U,V,B,k){U.isScene!==!0&&(U=Ut),q.resetTextureUnits();const pe=U.fog,_e=B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial?U.environment:null,fe=$===null?L.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:Xe.workingColorSpace,ye=B.isMeshStandardMaterial||B.isMeshLambertMaterial&&!B.envMap||B.isMeshPhongMaterial&&!B.envMap,Te=ne.get(B.envMap||_e,ye),Be=B.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,ze=!!V.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Ae=!!V.morphAttributes.position,ot=!!V.morphAttributes.normal,bt=!!V.morphAttributes.color;let yt=Ri;B.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(yt=L.toneMapping);const ht=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,kt=ht!==void 0?ht.length:0,xe=z.get(B),Qt=b.state.lights;if(je===!0&&(Ge===!0||y!==ie)){const mt=y===ie&&B.id===Q;Le.setState(B,y,mt)}let Je=!1;B.version===xe.__version?(xe.needsLights&&xe.lightsStateVersion!==Qt.state.version||xe.outputColorSpace!==fe||k.isBatchedMesh&&xe.batching===!1||!k.isBatchedMesh&&xe.batching===!0||k.isBatchedMesh&&xe.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&xe.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&xe.instancing===!1||!k.isInstancedMesh&&xe.instancing===!0||k.isSkinnedMesh&&xe.skinning===!1||!k.isSkinnedMesh&&xe.skinning===!0||k.isInstancedMesh&&xe.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&xe.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&xe.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&xe.instancingMorph===!1&&k.morphTexture!==null||xe.envMap!==Te||B.fog===!0&&xe.fog!==pe||xe.numClippingPlanes!==void 0&&(xe.numClippingPlanes!==Le.numPlanes||xe.numIntersection!==Le.numIntersection)||xe.vertexAlphas!==Be||xe.vertexTangents!==ze||xe.morphTargets!==Ae||xe.morphNormals!==ot||xe.morphColors!==bt||xe.toneMapping!==yt||xe.morphTargetsCount!==kt||!!xe.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(Je=!0):(Je=!0,xe.__version=B.version);let ai=xe.currentProgram;Je===!0&&(ai=zs(B,U,k),I&&B.isNodeMaterial&&I.onUpdateProgram(B,ai,xe));let _i=!1,Wi=!1,Tn=!1;const ut=ai.getUniforms(),Et=xe.uniforms;if(v.useProgram(ai.program)&&(_i=!0,Wi=!0,Tn=!0),B.id!==Q&&(Q=B.id,Wi=!0),xe.needsLights){const mt=Dh(b.state.lightProbeGridArray,k);xe.lightProbeGrid!==mt&&(xe.lightProbeGrid=mt,Wi=!0)}if(_i||ie!==y){v.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),ut.setValue(N,"projectionMatrix",y.projectionMatrix),ut.setValue(N,"viewMatrix",y.matrixWorldInverse);const qi=ut.map.cameraPosition;qi!==void 0&&qi.setValue(N,ft.setFromMatrixPosition(y.matrixWorld)),A.logarithmicDepthBuffer&&ut.setValue(N,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&ut.setValue(N,"isOrthographic",y.isOrthographicCamera===!0),ie!==y&&(ie=y,Wi=!0,Tn=!0)}if(xe.needsLights&&(Qt.state.directionalShadowMap.length>0&&ut.setValue(N,"directionalShadowMap",Qt.state.directionalShadowMap,q),Qt.state.spotShadowMap.length>0&&ut.setValue(N,"spotShadowMap",Qt.state.spotShadowMap,q),Qt.state.pointShadowMap.length>0&&ut.setValue(N,"pointShadowMap",Qt.state.pointShadowMap,q)),k.isSkinnedMesh){ut.setOptional(N,k,"bindMatrix"),ut.setOptional(N,k,"bindMatrixInverse");const mt=k.skeleton;mt&&(mt.boneTexture===null&&mt.computeBoneTexture(),ut.setValue(N,"boneTexture",mt.boneTexture,q))}k.isBatchedMesh&&(ut.setOptional(N,k,"batchingTexture"),ut.setValue(N,"batchingTexture",k._matricesTexture,q),ut.setOptional(N,k,"batchingIdTexture"),ut.setValue(N,"batchingIdTexture",k._indirectTexture,q),ut.setOptional(N,k,"batchingColorTexture"),k._colorsTexture!==null&&ut.setValue(N,"batchingColorTexture",k._colorsTexture,q));const Xi=V.morphAttributes;if((Xi.position!==void 0||Xi.normal!==void 0||Xi.color!==void 0)&&D.update(k,V,ai),(Wi||xe.receiveShadow!==k.receiveShadow)&&(xe.receiveShadow=k.receiveShadow,ut.setValue(N,"receiveShadow",k.receiveShadow)),(B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial)&&B.envMap===null&&U.environment!==null&&(Et.envMapIntensity.value=U.environmentIntensity),Et.dfgLUT!==void 0&&(Et.dfgLUT.value=a0()),Wi){if(ut.setValue(N,"toneMappingExposure",L.toneMappingExposure),xe.needsLights&&Uh(Et,Tn),pe&&B.fog===!0&&Ee.refreshFogUniforms(Et,pe),Ee.refreshMaterialUniforms(Et,B,ee,re,b.state.transmissionRenderTarget[y.id]),xe.needsLights&&xe.lightProbeGrid){const mt=xe.lightProbeGrid;Et.probesSH.value=mt.texture,Et.probesMin.value.copy(mt.boundingBox.min),Et.probesMax.value.copy(mt.boundingBox.max),Et.probesResolution.value.copy(mt.resolution)}Ir.upload(N,ml(xe),Et,q)}if(B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(Ir.upload(N,ml(xe),Et,q),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&ut.setValue(N,"center",k.center),ut.setValue(N,"modelViewMatrix",k.modelViewMatrix),ut.setValue(N,"normalMatrix",k.normalMatrix),ut.setValue(N,"modelMatrix",k.matrixWorld),B.uniformsGroups!==void 0){const mt=B.uniformsGroups;for(let qi=0,wn=mt.length;qi<wn;qi++){const vl=mt[qi];j.update(vl,ai),j.bind(vl,ai)}}return ai}function Uh(y,U){y.ambientLightColor.needsUpdate=U,y.lightProbe.needsUpdate=U,y.directionalLights.needsUpdate=U,y.directionalLightShadows.needsUpdate=U,y.pointLights.needsUpdate=U,y.pointLightShadows.needsUpdate=U,y.spotLights.needsUpdate=U,y.spotLightShadows.needsUpdate=U,y.rectAreaLights.needsUpdate=U,y.hemisphereLights.needsUpdate=U}function Oh(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return W},this.getActiveMipmapLevel=function(){return G},this.getRenderTarget=function(){return $},this.setRenderTargetTextures=function(y,U,V){const B=z.get(y);B.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,B.__autoAllocateDepthBuffer===!1&&(B.__useRenderToTexture=!1),z.get(y.texture).__webglTexture=U,z.get(y.depthTexture).__webglTexture=B.__autoAllocateDepthBuffer?void 0:V,B.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,U){const V=z.get(y);V.__webglFramebuffer=U,V.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(y,U=0,V=0){$=y,W=U,G=V;let B=null,k=!1,pe=!1;if(y){const fe=z.get(y);if(fe.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(N.FRAMEBUFFER,fe.__webglFramebuffer),se.copy(y.viewport),ge.copy(y.scissor),be=y.scissorTest,v.viewport(se),v.scissor(ge),v.setScissorTest(be),Q=-1;return}else if(fe.__webglFramebuffer===void 0)q.setupRenderTarget(y);else if(fe.__hasExternalTextures)q.rebindTextures(y,z.get(y.texture).__webglTexture,z.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const Be=y.depthTexture;if(fe.__boundDepthTexture!==Be){if(Be!==null&&z.has(Be)&&(y.width!==Be.image.width||y.height!==Be.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");q.setupDepthRenderbuffer(y)}}const ye=y.texture;(ye.isData3DTexture||ye.isDataArrayTexture||ye.isCompressedArrayTexture)&&(pe=!0);const Te=z.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Te[U])?B=Te[U][V]:B=Te[U],k=!0):y.samples>0&&q.useMultisampledRTT(y)===!1?B=z.get(y).__webglMultisampledFramebuffer:Array.isArray(Te)?B=Te[V]:B=Te,se.copy(y.viewport),ge.copy(y.scissor),be=y.scissorTest}else se.copy(Pe).multiplyScalar(ee).floor(),ge.copy(gt).multiplyScalar(ee).floor(),be=Ve;if(V!==0&&(B=H),v.bindFramebuffer(N.FRAMEBUFFER,B)&&v.drawBuffers(y,B),v.viewport(se),v.scissor(ge),v.setScissorTest(be),k){const fe=z.get(y.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+U,fe.__webglTexture,V)}else if(pe){const fe=U;for(let ye=0;ye<y.textures.length;ye++){const Te=z.get(y.textures[ye]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+ye,Te.__webglTexture,V,fe)}}else if(y!==null&&V!==0){const fe=z.get(y.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,fe.__webglTexture,V)}Q=-1},this.readRenderTargetPixels=function(y,U,V,B,k,pe,_e,fe=0){if(!(y&&y.isWebGLRenderTarget)){$e("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ye=z.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&_e!==void 0&&(ye=ye[_e]),ye){v.bindFramebuffer(N.FRAMEBUFFER,ye);try{const Te=y.textures[fe],Be=Te.format,ze=Te.type;if(y.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+fe),!A.textureFormatReadable(Be)){$e("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!A.textureTypeReadable(ze)){$e("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=y.width-B&&V>=0&&V<=y.height-k&&N.readPixels(U,V,B,k,he.convert(Be),he.convert(ze),pe)}finally{const Te=$!==null?z.get($).__webglFramebuffer:null;v.bindFramebuffer(N.FRAMEBUFFER,Te)}}},this.readRenderTargetPixelsAsync=async function(y,U,V,B,k,pe,_e,fe=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ye=z.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&_e!==void 0&&(ye=ye[_e]),ye)if(U>=0&&U<=y.width-B&&V>=0&&V<=y.height-k){v.bindFramebuffer(N.FRAMEBUFFER,ye);const Te=y.textures[fe],Be=Te.format,ze=Te.type;if(y.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+fe),!A.textureFormatReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!A.textureTypeReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ae=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Ae),N.bufferData(N.PIXEL_PACK_BUFFER,pe.byteLength,N.STREAM_READ),N.readPixels(U,V,B,k,he.convert(Be),he.convert(ze),0);const ot=$!==null?z.get($).__webglFramebuffer:null;v.bindFramebuffer(N.FRAMEBUFFER,ot);const bt=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await bu(N,bt,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Ae),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,pe),N.deleteBuffer(Ae),N.deleteSync(bt),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,U=null,V=0){const B=Math.pow(2,-V),k=Math.floor(y.image.width*B),pe=Math.floor(y.image.height*B),_e=U!==null?U.x:0,fe=U!==null?U.y:0;q.setTexture2D(y,0),N.copyTexSubImage2D(N.TEXTURE_2D,V,0,0,_e,fe,k,pe),v.unbindTexture()},this.copyTextureToTexture=function(y,U,V=null,B=null,k=0,pe=0){let _e,fe,ye,Te,Be,ze,Ae,ot,bt;const yt=y.isCompressedTexture?y.mipmaps[pe]:y.image;if(V!==null)_e=V.max.x-V.min.x,fe=V.max.y-V.min.y,ye=V.isBox3?V.max.z-V.min.z:1,Te=V.min.x,Be=V.min.y,ze=V.isBox3?V.min.z:0;else{const Et=Math.pow(2,-k);_e=Math.floor(yt.width*Et),fe=Math.floor(yt.height*Et),y.isDataArrayTexture?ye=yt.depth:y.isData3DTexture?ye=Math.floor(yt.depth*Et):ye=1,Te=0,Be=0,ze=0}B!==null?(Ae=B.x,ot=B.y,bt=B.z):(Ae=0,ot=0,bt=0);const ht=he.convert(U.format),kt=he.convert(U.type);let xe;U.isData3DTexture?(q.setTexture3D(U,0),xe=N.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(q.setTexture2DArray(U,0),xe=N.TEXTURE_2D_ARRAY):(q.setTexture2D(U,0),xe=N.TEXTURE_2D),v.activeTexture(N.TEXTURE0),v.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,U.flipY),v.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),v.pixelStorei(N.UNPACK_ALIGNMENT,U.unpackAlignment);const Qt=v.getParameter(N.UNPACK_ROW_LENGTH),Je=v.getParameter(N.UNPACK_IMAGE_HEIGHT),ai=v.getParameter(N.UNPACK_SKIP_PIXELS),_i=v.getParameter(N.UNPACK_SKIP_ROWS),Wi=v.getParameter(N.UNPACK_SKIP_IMAGES);v.pixelStorei(N.UNPACK_ROW_LENGTH,yt.width),v.pixelStorei(N.UNPACK_IMAGE_HEIGHT,yt.height),v.pixelStorei(N.UNPACK_SKIP_PIXELS,Te),v.pixelStorei(N.UNPACK_SKIP_ROWS,Be),v.pixelStorei(N.UNPACK_SKIP_IMAGES,ze);const Tn=y.isDataArrayTexture||y.isData3DTexture,ut=U.isDataArrayTexture||U.isData3DTexture;if(y.isDepthTexture){const Et=z.get(y),Xi=z.get(U),mt=z.get(Et.__renderTarget),qi=z.get(Xi.__renderTarget);v.bindFramebuffer(N.READ_FRAMEBUFFER,mt.__webglFramebuffer),v.bindFramebuffer(N.DRAW_FRAMEBUFFER,qi.__webglFramebuffer);for(let wn=0;wn<ye;wn++)Tn&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,z.get(y).__webglTexture,k,ze+wn),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,z.get(U).__webglTexture,pe,bt+wn)),N.blitFramebuffer(Te,Be,_e,fe,Ae,ot,_e,fe,N.DEPTH_BUFFER_BIT,N.NEAREST);v.bindFramebuffer(N.READ_FRAMEBUFFER,null),v.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(k!==0||y.isRenderTargetTexture||z.has(y)){const Et=z.get(y),Xi=z.get(U);v.bindFramebuffer(N.READ_FRAMEBUFFER,X),v.bindFramebuffer(N.DRAW_FRAMEBUFFER,F);for(let mt=0;mt<ye;mt++)Tn?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Et.__webglTexture,k,ze+mt):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Et.__webglTexture,k),ut?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Xi.__webglTexture,pe,bt+mt):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Xi.__webglTexture,pe),k!==0?N.blitFramebuffer(Te,Be,_e,fe,Ae,ot,_e,fe,N.COLOR_BUFFER_BIT,N.NEAREST):ut?N.copyTexSubImage3D(xe,pe,Ae,ot,bt+mt,Te,Be,_e,fe):N.copyTexSubImage2D(xe,pe,Ae,ot,Te,Be,_e,fe);v.bindFramebuffer(N.READ_FRAMEBUFFER,null),v.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else ut?y.isDataTexture||y.isData3DTexture?N.texSubImage3D(xe,pe,Ae,ot,bt,_e,fe,ye,ht,kt,yt.data):U.isCompressedArrayTexture?N.compressedTexSubImage3D(xe,pe,Ae,ot,bt,_e,fe,ye,ht,yt.data):N.texSubImage3D(xe,pe,Ae,ot,bt,_e,fe,ye,ht,kt,yt):y.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,pe,Ae,ot,_e,fe,ht,kt,yt.data):y.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,pe,Ae,ot,yt.width,yt.height,ht,yt.data):N.texSubImage2D(N.TEXTURE_2D,pe,Ae,ot,_e,fe,ht,kt,yt);v.pixelStorei(N.UNPACK_ROW_LENGTH,Qt),v.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Je),v.pixelStorei(N.UNPACK_SKIP_PIXELS,ai),v.pixelStorei(N.UNPACK_SKIP_ROWS,_i),v.pixelStorei(N.UNPACK_SKIP_IMAGES,Wi),pe===0&&U.generateMipmaps&&N.generateMipmap(xe),v.unbindTexture()},this.initRenderTarget=function(y){z.get(y).__webglFramebuffer===void 0&&q.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?q.setTextureCube(y,0):y.isData3DTexture?q.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?q.setTexture2DArray(y,0):q.setTexture2D(y,0),v.unbindTexture()},this.resetState=function(){W=0,G=0,$=null,v.reset(),me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return wi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Xe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Xe._getUnpackColorSpace()}}class Th extends Error{constructor(e="WebGL is not available in this browser."){super(e),this.name="WebGLUnavailableError"}}function l0(s,e){let t;try{t=new o0({canvas:s,antialias:!1,alpha:!1,powerPreference:"high-performance",stencil:!1,depth:!0,failIfMajorPerformanceCaveat:!1})}catch(n){throw new Th(n instanceof Error?n.message:"WebGL context creation failed.")}const i=Math.min(window.devicePixelRatio||1,ns[e].pixelRatioCap);return t.setPixelRatio(i),t.setSize(window.innerWidth,window.innerHeight,!1),t.setClearColor(ve.background,1),t.outputColorSpace=Vt,t.toneMapping=Vo,t.toneMappingExposure=.92,t.autoClear=!0,t.info.autoReset=!1,{renderer:t,pixelRatio:i}}function c0(s,e,t){const i=n=>{n.preventDefault(),e()};return s.addEventListener("webglcontextlost",i,!1),s.addEventListener("webglcontextrestored",t,!1),()=>{s.removeEventListener("webglcontextlost",i),s.removeEventListener("webglcontextrestored",t)}}const h0=`// ---------------------------------------------------------------------------
// Hashes and 3D simplex noise, shared by every shader in the project.
// snoise() is Ashima Arts' implementation (MIT licence).
// ---------------------------------------------------------------------------

float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

vec3 hash31(float p) {
  vec3 p3 = fract(vec3(p) * vec3(0.1031, 0.1030, 0.0973));
  p3 += dot(p3, p3.yxz + 33.33);
  return fract((p3.xxy + p3.yzz) * p3.zyx);
}

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

`,u0=`// ---------------------------------------------------------------------------
// Shared orb field.
//
// Both the particle cloud and the neural connection lines run this exact same
// displacement function, which is what keeps the lines glued to the particles
// they connect while all of the animation happens on the GPU.
// ---------------------------------------------------------------------------

uniform float uTime;
uniform float uFormation;     // 0 = scattered across the void, 1 = fully formed
uniform vec4  uModeWeights;   // neural, reactor, data, energy
uniform float uModeScanner;   // fifth weight, kept separate to stay within vec4
uniform vec4  uHandA;         // xyz = position in base space, w = strength
uniform vec4  uHandB;
uniform float uHandRadius;
uniform float uHandAttract;
uniform float uHandRepelRadius;
uniform float uHandRepel;
uniform float uContract;      // fist contraction, 0..1
uniform float uBurst;         // outward burst envelope, 0..1
uniform float uOrbScale;
uniform float uNoiseAmp;
uniform float uEnergy;        // overall activation, 0..1
uniform float uBreath;
uniform float uPulseSpeed;
uniform float uPulseWidth;
uniform float uPulseDecay;
uniform vec4  uPulses[PULSE_SLOTS]; // xyz = origin, w = start time

attribute vec3  aReactor;
attribute vec3  aData;
attribute vec3  aEnergy;
attribute vec3  aScanner;
attribute float aSeed;

#include "noise.glsl"

// --- orb field --------------------------------------------------------------

/** Weighted blend of the five procedural orb configurations. */
vec3 modeBlend(vec3 neuralBase) {
  return neuralBase * uModeWeights.x
       + aReactor   * uModeWeights.y
       + aData      * uModeWeights.z
       + aEnergy    * uModeWeights.w
       + aScanner   * uModeScanner;
}

/**
 * Expanding spherical wavefronts radiating from recent pulse origins.
 * This is what makes the network read as computationally alive.
 */
float pulseEnergy(vec3 p) {
  float total = 0.0;
  for (int i = 0; i < PULSE_SLOTS; i++) {
    vec4 pulse = uPulses[i];
    float age = uTime - pulse.w;
    if (age < 0.0 || age > 8.0) continue;
    float radius = age * uPulseSpeed;
    float d = distance(p, pulse.xyz);
    float band = (d - radius) / uPulseWidth;
    total += exp(-band * band) * exp(-age * uPulseDecay);
  }
  return total;
}

/** Attraction / short-range repulsion from one hand attractor. */
vec3 handForce(vec3 p, vec4 hand, inout float influence) {
  if (hand.w <= 0.001) return vec3(0.0);
  vec3 delta = hand.xyz - p;
  float dist = max(length(delta), 1e-4);
  vec3 dir = delta / dist;

  // Inverse-square falloff, clamped so particles never collapse onto the hand.
  float falloff = uHandRadius / (dist * dist + uHandRadius);
  float pull = falloff * smoothstep(uHandRadius * 2.0, 0.0, dist) * hand.w;
  float push = smoothstep(uHandRepelRadius, 0.0, dist) * hand.w;

  influence += pull;
  return dir * (pull * uHandAttract - push * uHandRepel);
}

/**
 * Full displacement pipeline for one node of the orb.
 * \`influence\` receives the hand proximity term and \`pulse\` the wavefront term,
 * both of which drive brightness downstream.
 */
vec3 orbDisplace(vec3 neuralBase, float seed, out float influence, out float pulse) {
  vec3 base = modeBlend(neuralBase);

  // Boot formation: particles stream inwards from the surrounding void.
  vec3 scatterDir = normalize(hash31(seed) * 2.0 - 1.0 + vec3(1e-4));
  vec3 scattered = scatterDir * (3.4 + hash11(seed * 7.31) * 7.0);
  float formation = smoothstep(0.0, 1.0, uFormation);
  base = mix(scattered, base, formation);

  vec3 radial = normalize(base + vec3(1e-5));
  vec3 p = base;

  // Organic breathing and drift.
  float n1 = snoise(base * 1.35 + vec3(0.0, uTime * 0.14, uTime * 0.06));
  float n2 = snoise(base * 3.10 - vec3(uTime * 0.21, 0.0, uTime * 0.10));
  float n3 = snoise(base * 3.10 + vec3(17.3, -8.1, 4.7));
  p += radial * (n1 * uNoiseAmp + uBreath * 0.05 * sin(uTime * 0.8 + seed * 6.2831));
  p += vec3(n2, n3, snoise(base * 3.10 - vec3(31.7, 5.2, -12.4))) * uNoiseAmp * 0.5;

  pulse = pulseEnergy(base);
  p += radial * pulse * 0.055;

  // Fist: everything is dragged towards the core.
  p = mix(p, radial * 0.34, uContract * 0.85);

  // Release: a radial shockwave with per-particle variation.
  p += radial * uBurst * (1.0 + hash11(seed * 3.77) * 1.35);

  influence = 0.0;
  p += handForce(p, uHandA, influence);
  p += handForce(p, uHandB, influence);
  influence = clamp(influence, 0.0, 1.6);

  return p * uOrbScale;
}
`,d0=`#include "common.glsl"

uniform float uPixelRatio;
uniform float uSizeScale;
uniform float uPointBoost;

attribute float aSize;
attribute float aLayer;

varying float vEnergy;
varying float vLayer;
varying float vSeed;
varying float vDepth;

void main() {
  float influence;
  float pulse;
  vec3 displaced = orbDisplace(position, aSeed, influence, pulse);

  vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
  float viewDepth = max(-mvPosition.z, 0.05);

  // Nodes further from the camera dim slightly, giving the cloud real volume.
  float depthFade = clamp(1.35 - (viewDepth - 3.0) / 9.0, 0.25, 1.35);

  float flicker = 0.84 + 0.16 * sin(uTime * (2.0 + hash11(aSeed) * 6.0) + aSeed * 41.7);
  float energy = (0.22 + uEnergy * 0.55) * flicker + pulse * 1.5 + influence * 1.7;

  vEnergy = energy;
  vLayer = aLayer;
  vSeed = aSeed;
  vDepth = depthFade;

  gl_PointSize =
      aSize * uPixelRatio * uPointBoost *
      (1.0 + influence * 1.4 + pulse * 0.9 + uEnergy * 0.25) *
      (uSizeScale / viewDepth) * depthFade;

  gl_Position = projectionMatrix * mvPosition;
}
`,f0=`precision highp float;

uniform vec3 uColorCore;   // hot centre
uniform vec3 uColorMid;    // body of the cloud
uniform vec3 uColorEdge;   // outermost, coolest nodes
uniform float uWarm;       // 0 = cyan mode, 1 = golden energy mode
uniform vec3 uWarmCore;
uniform vec3 uWarmMid;
uniform float uOpacity;

varying float vEnergy;
varying float vLayer;
varying float vSeed;
varying float vDepth;

void main() {
  // Soft circular falloff: bright centre, transparent rim. No hard squares.
  vec2 uv = gl_PointCoord - vec2(0.5);
  float r = length(uv);
  if (r > 0.5) discard;

  float glow = exp(-r * r * 13.0);
  float core = exp(-r * r * 64.0);
  float alpha = (glow * 0.75 + core * 0.85) * uOpacity;

  vec3 cool = mix(uColorEdge, uColorMid, vLayer);
  cool = mix(cool, uColorCore, clamp(vEnergy - 0.55, 0.0, 1.0));

  vec3 warm = mix(uWarmMid, uWarmCore, clamp(vEnergy - 0.35, 0.0, 1.0));
  vec3 tint = mix(cool, warm, uWarm);

  // The hottest nodes bleach towards white so bloom picks them up.
  tint = mix(tint, vec3(1.0), clamp(vEnergy - 1.25, 0.0, 0.65));

  float intensity = clamp(vEnergy, 0.0, 3.2) * vDepth;
  gl_FragColor = vec4(tint * intensity, alpha * clamp(intensity, 0.0, 1.6));
}
`,p0=`#include "common.glsl"

attribute float aEnd;       // 0 at the first endpoint, 1 at the second
attribute float aStrength;  // per-connection base weight
attribute float aLineSeed;  // identical at both endpoints of a connection

varying float vEnergy;
varying float vProgress;
varying float vLineSeed;
varying float vStrength;
varying float vDepth;

void main() {
  float influence;
  float pulse;
  // Identical displacement to the particle shader, so every line endpoint sits
  // exactly on the node it belongs to.
  vec3 displaced = orbDisplace(position, aSeed, influence, pulse);

  vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
  float viewDepth = max(-mvPosition.z, 0.05);

  vEnergy = pulse * 1.35 + influence * 1.9 + uEnergy * 0.45;
  vProgress = aEnd;
  vLineSeed = aLineSeed;
  vStrength = aStrength;
  vDepth = clamp(1.3 - (viewDepth - 3.0) / 10.0, 0.2, 1.3);

  gl_Position = projectionMatrix * mvPosition;
}
`,m0=`precision highp float;

uniform vec3  uColorLine;
uniform vec3  uColorHot;
uniform vec3  uWarmLine;
uniform vec3  uWarmHot;
uniform float uWarm;
uniform float uOpacity;
uniform float uTravelSpeed;
uniform float uTime;

varying float vEnergy;
varying float vProgress;
varying float vLineSeed;
varying float vStrength;
varying float vDepth;

void main() {
  // A bright head runs from one endpoint to the other, like an action potential
  // travelling down an axon. Each connection has its own phase and rate.
  float rate = 0.45 + fract(vLineSeed * 3.17) * 0.9;
  float head = fract(uTime * uTravelSpeed * rate + vLineSeed);
  float d = vProgress - head;
  float travel = exp(-(d * d) / 0.012);

  // Only a fraction of the network carries a visible impulse at any moment.
  float impulse = step(0.55, fract(vLineSeed * 91.7 + floor(uTime * uTravelSpeed * rate) * 0.618));
  travel *= impulse;

  float energy = vEnergy + travel * 0.9;
  float alpha = (uOpacity * vStrength * (0.35 + energy * 1.5)) * vDepth;

  vec3 cool = mix(uColorLine, uColorHot, clamp(energy, 0.0, 1.0));
  vec3 warm = mix(uWarmLine, uWarmHot, clamp(energy, 0.0, 1.0));
  vec3 tint = mix(cool, warm, uWarm);

  gl_FragColor = vec4(tint * (0.5 + energy * 1.4), clamp(alpha, 0.0, 1.0));
}
`,g0=`varying vec3 vNormalView;
varying vec3 vViewDir;
varying vec3 vLocal;

void main() {
  vLocal = position;
  vNormalView = normalize(normalMatrix * normal);
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vViewDir = normalize(-mvPosition.xyz);
  gl_Position = projectionMatrix * mvPosition;
}
`,v0=`precision highp float;

#include "noise.glsl"

uniform float uTime;
uniform vec3  uColorA;
uniform vec3  uColorB;
uniform vec3  uWarmA;
uniform vec3  uWarmB;
uniform float uWarm;
uniform float uIntensity;
uniform float uOpacity;
uniform float uFresnelPower;
uniform float uFresnelBoost;
uniform float uNoiseScale;
uniform float uFlow;
uniform float uPulse;

varying vec3 vNormalView;
varying vec3 vViewDir;
varying vec3 vLocal;

void main() {
  vec3 n = normalize(vNormalView);
  vec3 v = normalize(vViewDir);
  float fresnel = pow(1.0 - clamp(dot(n, v), 0.0, 1.0), uFresnelPower);

  // Layered plasma. Two octaves at different speeds avoid an obvious loop.
  vec3 q = vLocal * uNoiseScale;
  float n1 = snoise(q + vec3(0.0, uTime * uFlow, uTime * uFlow * 0.6));
  float n2 = snoise(q * 2.13 - vec3(uTime * uFlow * 0.8, 0.0, uTime * uFlow * 0.35));
  float n3 = snoise(q * 4.31 + vec3(uTime * uFlow * 0.45, -uTime * uFlow * 0.2, 0.0));
  float plasma = n1 * 0.55 + n2 * 0.3 + n3 * 0.15;
  plasma = plasma * 0.5 + 0.5;

  float body = mix(plasma, 1.0, fresnel * uFresnelBoost);
  vec3 cool = mix(uColorA, uColorB, clamp(body, 0.0, 1.0));
  vec3 warm = mix(uWarmA, uWarmB, clamp(body, 0.0, 1.0));
  vec3 tint = mix(cool, warm, uWarm);

  float intensity = uIntensity * (0.72 + uPulse * 0.55) * (0.45 + body);
  float alpha = clamp((fresnel * 0.85 + plasma * 0.5) * uOpacity, 0.0, 1.0);

  gl_FragColor = vec4(tint * intensity, alpha);
}
`,x0=`varying vec3 vLocal;

void main() {
  vLocal = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,_0=`precision highp float;

// Generic holographic ring. All of the concentric rings around the core share
// this program; each instance varies the uniforms to become a segmented ring,
// a dotted ring, a broken ring, a scanning ring, and so on.

#define TAU 6.283185307179586

uniform float uTime;
uniform vec3  uColor;
uniform vec3  uWarmColor;
uniform float uWarm;
uniform float uOpacity;
uniform float uEnergy;

uniform float uInner;       // inner radius in local units
uniform float uOuter;       // outer radius in local units
uniform float uFeather;     // edge softness

uniform float uSegments;    // 0 = solid ring
uniform float uDashRatio;   // fraction of each segment that is lit
uniform float uSegmentSpin; // radians/second the segment pattern rotates

uniform float uSweep;       // 0/1 enable the rotating scan arc
uniform float uSweepSpeed;
uniform float uSweepWidth;  // radians

uniform float uGapStart;    // broken ring: start of the missing arc, radians
uniform float uGapSize;     // broken ring: size of the missing arc, radians

varying vec3 vLocal;

float angularDelta(float a, float b) {
  float d = abs(a - b);
  return min(d, TAU - d);
}

void main() {
  float radius = length(vLocal.xy);
  float angle = atan(vLocal.y, vLocal.x);
  if (angle < 0.0) angle += TAU;

  // Crisp band with feathered edges.
  float band = smoothstep(uInner - uFeather, uInner + uFeather, radius) *
               (1.0 - smoothstep(uOuter - uFeather, uOuter + uFeather, radius));
  if (band <= 0.001) discard;

  float mask = 1.0;

  if (uSegments > 0.5) {
    float spun = angle + uTime * uSegmentSpin;
    float cell = fract(spun / TAU * uSegments);
    float edge = 0.5 / uSegments;
    mask *= smoothstep(0.0, edge, cell) * (1.0 - smoothstep(uDashRatio - edge, uDashRatio, cell));
  }

  if (uGapSize > 0.001) {
    // Broken ring: remove one arc, with softened ends.
    float rel = mod(angle - uGapStart + TAU, TAU);
    float inside = smoothstep(0.0, 0.04, rel) * (1.0 - smoothstep(uGapSize - 0.04, uGapSize, rel));
    mask *= 1.0 - inside;
  }

  float sweep = 0.0;
  if (uSweep > 0.5) {
    float head = mod(uTime * uSweepSpeed, TAU);
    float d = angularDelta(angle, head);
    sweep = exp(-(d * d) / (uSweepWidth * uSweepWidth));
    // A dim tail trails behind the head.
    float behind = mod(head - angle + TAU, TAU);
    sweep += 0.35 * exp(-behind * 1.6);
  }

  float intensity = mask * (0.55 + uEnergy * 0.8) + sweep * (1.1 + uEnergy);
  vec3 tint = mix(uColor, uWarmColor, uWarm);

  float alpha = clamp(band * (mask * 0.85 + sweep) * uOpacity, 0.0, 1.0);
  gl_FragColor = vec4(tint * intensity, alpha);
}
`,S0=`varying vec2 vUv;
varying vec3 vNormalView;
varying vec3 vViewDir;

void main() {
  vUv = uv;
  vNormalView = normalize(normalMatrix * normal);
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vViewDir = normalize(-mvPosition.xyz);
  gl_Position = projectionMatrix * mvPosition;
}
`,y0=`precision highp float;

#include "noise.glsl"

// Holographic filament drawn between a fingertip and the core.
// v runs 0 -> 1 along the length of the beam.

uniform float uTime;
uniform vec3  uColor;
uniform vec3  uWarmColor;
uniform float uWarm;
uniform float uOpacity;
uniform float uFlowSpeed;
uniform float uSeed;

varying vec2 vUv;
varying vec3 vNormalView;
varying vec3 vViewDir;

void main() {
  float along = vUv.y;

  // Edge-on parts of the tube glow brighter, so it reads as a volume.
  float rim = 1.0 - abs(dot(normalize(vNormalView), normalize(vViewDir)));
  rim = pow(clamp(rim, 0.0, 1.0), 1.6);

  // Turbulent filament rather than a clean cylinder.
  float wobble = snoise(vec3(vUv.x * 3.0, along * 6.0 - uTime * uFlowSpeed, uSeed)) * 0.5 + 0.5;

  // Charge packets running from the hand to the core.
  float packets = 0.0;
  for (int i = 0; i < 3; i++) {
    float phase = fract(uTime * uFlowSpeed * (0.5 + float(i) * 0.17) + uSeed + float(i) * 0.37);
    float d = along - phase;
    packets += exp(-(d * d) / 0.0035);
  }

  // Both ends fade out so the beam attaches softly.
  float ends = smoothstep(0.0, 0.12, along) * (1.0 - smoothstep(0.86, 1.0, along));

  float intensity = (0.35 + wobble * 0.5) * rim + packets * 0.9;
  vec3 tint = mix(uColor, uWarmColor, uWarm);

  float alpha = clamp(intensity * ends * uOpacity, 0.0, 1.0);
  gl_FragColor = vec4(tint * (0.6 + intensity * 1.6), alpha);
}
`,M0=`uniform float uTime;
uniform float uPixelRatio;

attribute float aSize;
attribute float aSeed;

varying float vTwinkle;
varying float vSeed;

void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  // Slow, uncorrelated twinkle so the field never pulses in unison.
  vTwinkle = 0.55 + 0.45 * sin(uTime * (0.25 + aSeed * 0.8) + aSeed * 53.1);
  vSeed = aSeed;
  gl_PointSize = aSize * uPixelRatio * (140.0 / max(-mvPosition.z, 1.0));
  gl_Position = projectionMatrix * mvPosition;
}
`,b0=`precision highp float;

uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uOpacity;

varying float vTwinkle;
varying float vSeed;

void main() {
  vec2 uv = gl_PointCoord - vec2(0.5);
  float r = length(uv);
  if (r > 0.5) discard;

  float glow = exp(-r * r * 22.0);
  vec3 tint = mix(uColorA, uColorB, fract(vSeed * 7.31));
  gl_FragColor = vec4(tint * vTwinkle * 1.1, glow * vTwinkle * uOpacity);
}
`,E0=`varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,T0=`precision highp float;

#include "noise.glsl"

// Soft atmospheric bloom sitting behind the core, giving the composition depth
// without resorting to a generic galaxy backdrop.

uniform float uTime;
uniform vec3  uColor;
uniform vec3  uWarmColor;
uniform float uWarm;
uniform float uOpacity;
uniform float uEnergy;

varying vec2 vUv;

void main() {
  vec2 p = vUv * 2.0 - 1.0;
  float r = length(p);

  float falloff = exp(-r * r * 2.6);
  float drift = snoise(vec3(p * 1.4, uTime * 0.05)) * 0.5 + 0.5;
  float veil = falloff * (0.55 + drift * 0.65);

  vec3 tint = mix(uColor, uWarmColor, uWarm);
  float alpha = clamp(veil * uOpacity * (0.7 + uEnergy * 0.6), 0.0, 1.0);
  gl_FragColor = vec4(tint * (0.5 + uEnergy * 0.5), alpha);
}
`,w0=`uniform float uTime;
uniform float uPixelRatio;
uniform float uSizeScale;

attribute vec3  aVelocity;
attribute float aBirth;
attribute float aLife;
attribute float aSize;

varying float vAge;
varying float vSeed;

void main() {
  float age = (uTime - aBirth) / max(aLife, 0.001);
  vAge = clamp(age, 0.0, 1.0);
  vSeed = aSize;

  // Ballistic spark with drag, so the shell decelerates as it expands.
  float drag = 1.0 - exp(-vAge * 2.6);
  vec3 pos = position + aVelocity * drag * aLife;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  float fade = 1.0 - vAge;
  gl_PointSize = aSize * uPixelRatio * fade * (uSizeScale / max(-mvPosition.z, 0.1));
  gl_Position = projectionMatrix * mvPosition;
}
`,A0=`precision highp float;

uniform vec3  uColor;
uniform vec3  uHotColor;
uniform float uOpacity;

varying float vAge;
varying float vSeed;

void main() {
  vec2 uv = gl_PointCoord - vec2(0.5);
  float r = length(uv);
  if (r > 0.5) discard;

  float glow = exp(-r * r * 18.0);
  float fade = pow(1.0 - vAge, 2.2);
  // Sparks cool from white-hot to the accent colour as they travel.
  vec3 tint = mix(uHotColor, uColor, clamp(vAge * 1.6, 0.0, 1.0));

  gl_FragColor = vec4(tint * (1.4 - vAge), glow * fade * uOpacity);
}
`,R0=`#include "noise.glsl"

// Tiny data particles orbiting the core. Their entire trajectory is evaluated
// on the GPU from a handful of per-particle attributes, so the CPU does no work
// for them at all.

#define TAU 6.283185307179586

uniform float uTime;
uniform float uPixelRatio;
uniform float uSizeScale;
uniform float uOrbScale;
uniform float uEnergy;

attribute float aType;    // 0 orbit, 1 inward, 2 outward, 3 drifting
attribute float aRadius;
attribute float aSpeed;
attribute float aPhase;
attribute float aLife;
attribute float aSize;
attribute float aTilt;
attribute float aSeed;

varying float vFade;
varying float vSeed;
varying float vType;

void main() {
  float local = fract((uTime + aPhase * aLife) / aLife);

  float radius = aRadius;
  float fade = 1.0;

  if (aType < 0.5) {
    // Orbit at a steady radius.
    fade = 1.0;
  } else if (aType < 1.5) {
    // Falls inwards, then respawns at the rim.
    radius = mix(aRadius, 0.28, local);
    fade = smoothstep(0.0, 0.12, local) * (1.0 - smoothstep(0.82, 1.0, local));
  } else if (aType < 2.5) {
    // Escapes outwards and dims as it goes.
    radius = mix(0.55, aRadius * 2.1, local);
    fade = smoothstep(0.0, 0.08, local) * (1.0 - smoothstep(0.55, 1.0, local));
  } else {
    // Slow radial breathing.
    radius = aRadius * (1.0 + 0.16 * sin(uTime * aSpeed + aPhase * TAU));
    fade = 0.75;
  }

  float angle = aPhase * TAU + uTime * aSpeed * (0.4 + uEnergy * 0.6);
  float height = sin(aTilt) * radius;
  float planar = cos(aTilt) * radius;

  vec3 pos = vec3(cos(angle) * planar, height, sin(angle) * planar);

  // A little noise so the motes never trace perfect circles.
  float wobble = snoise(vec3(pos * 0.9 + aSeed * 13.0));
  pos += normalize(pos + vec3(1e-5)) * wobble * 0.05;
  pos *= uOrbScale;

  vFade = fade;
  vSeed = aSeed;
  vType = aType;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = aSize * uPixelRatio * (uSizeScale / max(-mvPosition.z, 0.1));
  gl_Position = projectionMatrix * mvPosition;
}
`,C0=`precision highp float;

uniform vec3  uColor;
uniform vec3  uHotColor;
uniform vec3  uWarmColor;
uniform float uWarm;
uniform float uOpacity;
uniform float uEnergy;

varying float vFade;
varying float vSeed;
varying float vType;

void main() {
  vec2 uv = gl_PointCoord - vec2(0.5);
  float r = length(uv);
  if (r > 0.5) discard;

  float glow = exp(-r * r * 20.0);
  // Inbound motes read hotter than the ambient drift.
  float hot = step(0.5, vType) * step(vType, 1.5);
  vec3 cool = mix(uColor, uHotColor, hot * 0.7 + fract(vSeed * 5.1) * 0.25);
  vec3 tint = mix(cool, uWarmColor, uWarm);

  float alpha = glow * vFade * uOpacity * (0.55 + uEnergy * 0.6);
  gl_FragColor = vec4(tint * (0.9 + uEnergy * 0.7), alpha);
}
`,P0=`uniform float uTime;
uniform float uPixelRatio;
uniform float uSizeScale;

attribute float aBirth;
attribute float aLife;
attribute float aSize;
attribute float aCharge;

varying float vAge;
varying float vCharge;

void main() {
  float age = clamp((uTime - aBirth) / max(aLife, 0.001), 0.0, 1.0);
  vAge = age;
  vCharge = aCharge;

  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  float fade = 1.0 - age;
  gl_PointSize = aSize * uPixelRatio * fade * (uSizeScale / max(-mvPosition.z, 0.1));
  gl_Position = projectionMatrix * mvPosition;
}
`,L0=`precision highp float;

uniform vec3 uColor;
uniform vec3 uHotColor;
uniform float uOpacity;

varying float vAge;
varying float vCharge;

void main() {
  vec2 uv = gl_PointCoord - vec2(0.5);
  float r = length(uv);
  if (r > 0.5) discard;

  float glow = exp(-r * r * 16.0);
  float fade = pow(1.0 - vAge, 1.8);
  vec3 tint = mix(uColor, uHotColor, vCharge);

  gl_FragColor = vec4(tint * (0.8 + vCharge * 1.4), glow * fade * uOpacity);
}
`,I0=`varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,D0=`precision highp float;

// Final grade: a restrained pass of chromatic aberration, film grain, vignette
// and scanlines. Deliberately subtle — the core has to stay crisp.

uniform sampler2D tDiffuse;
uniform float uTime;
uniform vec2  uResolution;
uniform float uAberration;
uniform float uGrain;
uniform float uVignette;
uniform float uScanline;
uniform float uAlert;      // 0 = normal, 1 = amber warning wash

varying vec2 vUv;

float rand(vec2 co) {
  return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = vUv;
  vec2 centred = uv - 0.5;
  float r2 = dot(centred, centred);

  vec3 color;
  if (uAberration > 0.0001) {
    // Aberration scales with distance from the centre, as in a real lens.
    vec2 offset = centred * uAberration * (0.35 + r2 * 2.2);
    color.r = texture2D(tDiffuse, uv + offset).r;
    color.g = texture2D(tDiffuse, uv).g;
    color.b = texture2D(tDiffuse, uv - offset).b;
  } else {
    color = texture2D(tDiffuse, uv).rgb;
  }

  if (uGrain > 0.0001) {
    float noise = rand(uv * uResolution * 0.5 + fract(uTime) * 91.7);
    color += (noise - 0.5) * uGrain;
  }

  if (uScanline > 0.0001) {
    float lines = sin(uv.y * uResolution.y * 1.4 + uTime * 1.5) * 0.5 + 0.5;
    color *= 1.0 - uScanline * lines;
  }

  color *= mix(1.0, smoothstep(0.85, 0.15, r2), uVignette);

  if (uAlert > 0.001) {
    vec3 wash = vec3(1.0, 0.62, 0.22);
    float edge = smoothstep(0.05, 0.5, r2);
    color = mix(color, color * wash + wash * 0.05 * edge, uAlert * 0.55);
  }

  gl_FragColor = vec4(color, 1.0);
}
`,N0={"noise.glsl":h0,"common.glsl":u0},U0=/^[ \t]*#include[ \t]+"([^"]+)"[ \t]*$/gm;function xt(s,e=new Set){return s.replace(U0,(t,i)=>{if(e.has(i))return"";const n=N0[i];if(n===void 0)throw new Error(`[shaders] unknown include "${i}"`);const r=new Set(e);return r.add(i),xt(n,r)})}const Ze={particle:{vert:xt(d0),frag:xt(f0)},neural:{vert:xt(p0),frag:xt(m0)},core:{vert:xt(g0),frag:xt(v0)},hologram:{vert:xt(x0),frag:xt(_0)},beam:{vert:xt(S0),frag:xt(y0)},background:{vert:xt(M0),frag:xt(b0)},haze:{vert:xt(E0),frag:xt(T0)},burst:{vert:xt(w0),frag:xt(A0)},motes:{vert:xt(R0),frag:xt(C0)},trail:{vert:xt(P0),frag:xt(L0)},composite:{vert:xt(I0),frag:xt(D0)}};class O0{stars;haze;starUniforms;hazeUniforms;disposables=[];constructor(e,t=1100,i=4242){const n=Us(i),r=new Float32Array(t*3),a=new Float32Array(t),o=new Float32Array(t);for(let u=0;u<t;u++){const m=n()*2-1,g=n()*Nt,x=Math.sqrt(Math.max(0,1-m*m)),f=28+n()*44;r[u*3]=x*Math.cos(g)*f,r[u*3+1]=x*Math.sin(g)*f,r[u*3+2]=m*f,a[u]=.5+Math.pow(n(),3)*2.6,o[u]=n()}const c=new it;c.setAttribute("position",new Ie(r,3)),c.setAttribute("aSize",new Ie(a,1)),c.setAttribute("aSeed",new Ie(o,1)),this.starUniforms={uTime:{value:0},uPixelRatio:{value:e},uColorA:{value:new te(ve.cyanDim)},uColorB:{value:new te(ve.iceBlue)},uOpacity:{value:.55}};const l=new et({uniforms:this.starUniforms,vertexShader:Ze.background.vert,fragmentShader:Ze.background.frag,transparent:!0,depthWrite:!1,blending:Qe});this.stars=new hs(c,l),this.stars.name="starfield",this.stars.renderOrder=-10,this.disposables.push(c,l),this.hazeUniforms={uTime:{value:0},uColor:{value:new te(ve.cyanDim)},uWarmColor:{value:new te(ve.goldDeep)},uWarm:{value:0},uOpacity:{value:.42},uEnergy:{value:.3}};const h=new Fs(1,1),p=new et({uniforms:this.hazeUniforms,vertexShader:Ze.haze.vert,fragmentShader:Ze.haze.frag,transparent:!0,depthWrite:!1,depthTest:!1,blending:Qe});this.haze=new rt(h,p),this.haze.name="core-haze",this.haze.renderOrder=-9,this.haze.position.set(0,0,-13),this.haze.scale.set(24,24,1),this.disposables.push(h,p)}update(e,t,i){this.starUniforms.uTime.value=e,this.hazeUniforms.uTime.value=e,this.hazeUniforms.uEnergy.value=t,this.hazeUniforms.uWarm.value=i,this.hazeUniforms.uOpacity.value=.3+t*.3,this.stars.rotation.y=e*.004,this.stars.rotation.x=Math.sin(e*.011)*.05}setPixelRatio(e){this.starUniforms.uPixelRatio.value=e}dispose(){for(const e of this.disposables)e.dispose()}}class F0{camera;lookAt=new P(0,0,0);current=new P(0,0,ti.cameraDistance);theta=0;targetTheta=0;phi=Math.PI*.4;targetPhi=Math.PI*.4;distance=8.2;targetDistance=8.2;parallaxX=0;parallaxY=0;breathPhase=0;reducedMotion=!1;constructor(e){this.camera=new ni(ti.fov,e,ti.near,ti.far),this.updatePosition(),this.camera.lookAt(this.lookAt)}orbit(e,t){this.targetTheta+=e,this.targetPhi=Oi(this.targetPhi+t,.04,Math.PI-.04)}setTopView(){this.targetPhi=.05,this.targetTheta=0}setBottomView(){this.targetPhi=Math.PI-.05,this.targetTheta=0}setLeftView(){this.targetPhi=Math.PI*.5,this.targetTheta=-Math.PI*.5}setRightView(){this.targetPhi=Math.PI*.5,this.targetTheta=Math.PI*.5}resetView(){this.targetPhi=Math.PI*.4,this.targetTheta=0,this.targetDistance=8.2}setParallax(e,t){this.parallaxX=Oi(e,-1,1),this.parallaxY=Oi(t,-1,1)}setDistance(e){this.targetDistance=Oi(e,2.5,24)}nudgeDistance(e){this.setDistance(this.targetDistance+e)}setReducedMotion(e){this.reducedMotion=e}updatePosition(){const e=Math.sin(this.phi),t=Math.cos(this.phi),i=Math.sin(this.theta),n=Math.cos(this.theta);this.current.set(this.distance*e*i,this.distance*t,this.distance*e*n),Math.abs(t)>.96?this.camera.up.set(0,0,t>0?-1:1):this.camera.up.set(0,1,0),this.camera.position.copy(this.current),this.camera.lookAt(this.lookAt)}update(e){this.breathPhase+=e,this.theta=Ke(this.theta,this.targetTheta,10,e),this.phi=Ke(this.phi,this.targetPhi,10,e),this.distance=Ke(this.distance,this.targetDistance,7,e);const t=this.reducedMotion?0:ti.parallax*.25,i=this.reducedMotion?0:Math.sin(this.breathPhase*.17)*.03,n=this.reducedMotion?0:Math.sin(this.breathPhase*.23+1.7)*.02,r=this.theta+this.parallaxX*t+i,a=Oi(this.phi+this.parallaxY*t+n,.04,Math.PI-.04),o=Math.sin(a),c=Math.cos(a),l=Math.sin(r),h=Math.cos(r);this.current.set(this.distance*o*l,this.distance*c,this.distance*o*h),Math.abs(c)>.96?this.camera.up.set(0,0,c>0?-1:1):this.camera.up.set(0,1,0),this.camera.position.copy(this.current),this.camera.lookAt(this.lookAt)}resize(e,t){this.camera.aspect=e/t;const i=t>e;this.camera.fov=i?ti.fov*1.35:ti.fov,this.camera.updateProjectionMatrix()}get currentDistance(){return this.distance}}class B0{scene=new ku;rig;background;ambient;rimLight;fillLight;constructor(e,t){this.scene.background=new te(ve.background),this.scene.fog=new jo(ve.background,.012),this.rig=new F0(e),this.scene.add(this.rig.camera),this.background=new O0(t),this.scene.add(this.background.stars),this.rig.camera.add(this.background.haze),this.ambient=new ad(ve.iceBlue,ti.ambientIntensity),this.scene.add(this.ambient),this.rimLight=new Uo(ve.cyan,ti.rimLightIntensity,22,1.4),this.rimLight.position.set(-4.5,2.8,-3.4),this.scene.add(this.rimLight),this.fillLight=new Uo(ve.iceBlue,ti.rimLightIntensity*.6,20,1.6),this.fillLight.position.set(4.2,-2.4,3),this.scene.add(this.fillLight)}add(e){this.scene.add(e)}update(e,t,i,n){this.rig.update(e),this.background.update(t,i,n),this.rimLight.intensity=ti.rimLightIntensity*(.6+i*.7)}resize(e,t){this.rig.resize(e,t)}setPixelRatio(e){this.background.setPixelRatio(e)}dispose(){this.background.dispose()}}const Dr={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Bs{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const k0=new ol(-1,1,1,-1,0,1);class z0 extends it{constructor(){super(),this.setAttribute("position",new ct([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ct([0,2,0,0,2,0],2))}}const H0=new z0;class wh{constructor(e){this._mesh=new rt(H0,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,k0)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Ah extends Bs{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof et?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Xr.clone(e.uniforms),this.material=new et({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new wh(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Rc extends Bs{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const n=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(n.REPLACE,n.REPLACE,n.REPLACE),r.buffers.stencil.setFunc(n.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(n.EQUAL,1,4294967295),r.buffers.stencil.setOp(n.KEEP,n.KEEP,n.KEEP),r.buffers.stencil.setLocked(!0)}}class V0 extends Bs{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class G0{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new we);this._width=i.width,this._height=i.height,t=new Jt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:ri}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Ah(Dr),this.copyPass.material.blending=Ai,this.timer=new cd}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let n=0,r=this.passes.length;n<r;n++){const a=this.passes[n];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(n),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),a.needsSwap){if(i){const o=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Rc!==void 0&&(a instanceof Rc?i=!0:a instanceof V0&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new we);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,n=this._height*this._pixelRatio;this.renderTarget1.setSize(i,n),this.renderTarget2.setSize(i,n);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,n)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class W0 extends Bs{constructor(e,t,i=null,n=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=n,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new te}render(e,t,i){const n=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=n}}const X0={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new te(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class cs extends Bs{constructor(e,t=1,i,n){super(),this.strength=t,this.radius=i,this.threshold=n,this.resolution=e!==void 0?new we(e.x,e.y):new we(256,256),this.clearColor=new te(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Jt(r,a,{type:ri}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const p=new Jt(r,a,{type:ri});p.texture.name="UnrealBloomPass.h"+h,p.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(p);const u=new Jt(r,a,{type:ri});u.texture.name="UnrealBloomPass.v"+h,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),r=Math.round(r/2),a=Math.round(a/2)}const o=X0;this.highPassUniforms=Xr.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=n,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new et({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const c=[6,10,14,18,22];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new we(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Xr.clone(Dr.uniforms),this.blendMaterial=new et({uniforms:this.copyUniforms,vertexShader:Dr.vertexShader,fragmentShader:Dr.fragmentShader,premultipliedAlpha:!0,blending:Qe,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new te,this._oldClearAlpha=1,this._basic=new Vi,this._fsQuad=new wh(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let i=Math.round(e/2),n=Math.round(t/2);this.renderTargetBright.setSize(i,n);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(i,n),this.renderTargetsVertical[r].setSize(i,n),this.separableBlurMaterials[r].uniforms.invSize.value=new we(1/i,1/n),i=Math.round(i/2),n=Math.round(n/2)}render(e,t,i,n,r){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[c].uniforms.direction.value=cs.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[c]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=cs.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[c]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(i),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=a}_getSeparableBlurMaterial(e){const t=[],i=e/3;for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(i*i))/i);return new et({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new we(.5,.5)},direction:{value:new we(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {

					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;

					for ( int i = 1; i < KERNEL_RADIUS; i ++ ) {

						float x = float( i );
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new et({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}cs.BlurDirectionX=new we(1,0);cs.BlurDirectionY=new we(0,1);class q0{composer;bloom;composite;renderPass;enabled=!0;alert=0;alertTarget=0;bloomBase;grainBase;constructor(e,t,i,n,r,a){const o=ns[n];this.bloomBase=o.bloomStrength,this.grainBase=o.grain?.045:0,this.composer=new G0(e),this.composer.setSize(r,a),this.renderPass=new W0(t,i),this.composer.addPass(this.renderPass),this.bloom=new cs(new we(r,a),o.bloomStrength,o.bloomRadius,.62),this.composer.addPass(this.bloom),this.composite=new Ah({uniforms:{tDiffuse:{value:null},uTime:{value:0},uResolution:{value:new we(r,a)},uAberration:{value:o.chromaticAberration?.0016:0},uGrain:{value:o.grain?.045:0},uVignette:{value:.85},uScanline:{value:.018},uAlert:{value:0}},vertexShader:Ze.composite.vert,fragmentShader:Ze.composite.frag}),this.composite.renderToScreen=!0,this.composer.addPass(this.composite)}update(e,t,i){this.composite.uniforms.uTime.value=t,this.alert=Ke(this.alert,this.alertTarget,3,e),this.composite.uniforms.uAlert.value=this.alert,this.bloom.strength=this.bloomBase*(.85+i*.45)}setQuality(e){const t=ns[e];this.bloomBase=t.bloomStrength,this.grainBase=t.grain?.045:0,this.bloom.radius=t.bloomRadius,this.composite.uniforms.uAberration.value=t.chromaticAberration?.0016:0,this.composite.uniforms.uGrain.value=this.grainBase}setAlert(e){this.alertTarget=e?1:0}setHighContrast(e){this.composite.uniforms.uVignette.value=e?.35:.85,this.composite.uniforms.uScanline.value=e?0:.018,this.composite.uniforms.uGrain.value=e?0:this.grainBase}setEnabled(e){this.enabled=e,this.bloom.enabled=e,this.composite.enabled=e}get isEnabled(){return this.enabled}setSize(e,t){this.composer.setSize(e,t),this.bloom.setSize(e,t),this.composite.uniforms.uResolution.value.set(e,t)}setCamera(e){this.renderPass.camera=e}render(){this.composer.render()}dispose(){this.composer.dispose(),this.bloom.dispose()}}function Y0(){const s=[];for(let e=0;e<vn.slots;e++)s.push(new dt(0,0,0,-1e3));return{uTime:{value:0},uFormation:{value:0},uModeWeights:{value:new dt(1,0,0,0)},uModeScanner:{value:0},uHandA:{value:new dt(0,0,0,0)},uHandB:{value:new dt(0,0,0,0)},uHandRadius:{value:We.handInfluenceRadius},uHandAttract:{value:We.handAttraction},uHandRepelRadius:{value:We.handRepulsionRadius},uHandRepel:{value:We.handRepulsion},uContract:{value:0},uBurst:{value:0},uOrbScale:{value:1},uNoiseAmp:{value:We.noiseAmplitude},uEnergy:{value:.25},uBreath:{value:1},uPulseSpeed:{value:vn.speed},uPulseWidth:{value:vn.width},uPulseDecay:{value:vn.decay},uPulses:{value:s}}}const Rh={PULSE_SLOTS:vn.slots};class $0{points;uniforms;geometry;material;constructor(e,t,i){this.geometry=new it,this.geometry.setAttribute("position",new Ie(e.neural,3)),this.geometry.setAttribute("aReactor",new Ie(e.reactor,3)),this.geometry.setAttribute("aData",new Ie(e.data,3)),this.geometry.setAttribute("aEnergy",new Ie(e.energy,3)),this.geometry.setAttribute("aScanner",new Ie(e.scanner,3)),this.geometry.setAttribute("aSize",new Ie(e.sizes,1)),this.geometry.setAttribute("aLayer",new Ie(e.layers,1)),this.geometry.setAttribute("aSeed",new Ie(e.seeds,1)),this.geometry.boundingSphere=new ui(new P,12),this.uniforms={...t,uPixelRatio:{value:i},uSizeScale:{value:3.2},uPointBoost:{value:1},uColorCore:{value:new te(ve.white)},uColorMid:{value:new te(ve.cyan)},uColorEdge:{value:new te(ve.cyanDim)},uWarmCore:{value:new te(ve.gold)},uWarmMid:{value:new te(ve.goldDeep)},uWarm:{value:0},uOpacity:{value:1}},this.material=new et({defines:{...Rh},uniforms:this.uniforms,vertexShader:Ze.particle.vert,fragmentShader:Ze.particle.frag,transparent:!0,depthWrite:!1,depthTest:!0,blending:Qe}),this.points=new hs(this.geometry,this.material),this.points.frustumCulled=!1,this.points.renderOrder=6,this.points.name="neural-particles"}setPixelRatio(e){this.uniforms.uPixelRatio.value=e}dispose(){this.geometry.dispose(),this.material.dispose()}}class K0{cellSize;buckets=new Map;positions;constructor(e,t){this.positions=e,this.cellSize=t;const i=e.length/3;for(let n=0;n<i;n++){const r=this.keyAt(e[n*3],e[n*3+1],e[n*3+2]),a=this.buckets.get(r);a?a.push(n):this.buckets.set(r,[n])}}hashCell(e,t,i){return(e*73856093^t*19349663^i*83492791)>>>0}keyAt(e,t,i){return this.hashCell(Math.floor(e/this.cellSize),Math.floor(t/this.cellSize),Math.floor(i/this.cellSize))}buildPairs(e,t,i){const n=this.positions.length/3,r=e*e,a=new Uint8Array(n),o=[],c=new Set,l=[];for(let h=0;h<n&&o.length<i*2;h++){if(a[h]>=t)continue;const p=this.positions[h*3],u=this.positions[h*3+1],m=this.positions[h*3+2],g=Math.floor(p/this.cellSize),x=Math.floor(u/this.cellSize),f=Math.floor(m/this.cellSize);l.length=0;for(let d=-1;d<=1;d++)for(let T=-1;T<=1;T++)for(let E=-1;E<=1;E++){const S=this.buckets.get(this.hashCell(g+d,x+T,f+E));if(S)for(let M=0;M<S.length;M++){const b=S[M];if(b<=h||a[b]>=t)continue;const R=this.positions[b*3]-p,_=this.positions[b*3+1]-u,w=this.positions[b*3+2]-m;R*R+_*_+w*w>r||l.push(b)}}for(let d=0;d<l.length&&a[h]<t;d++){const T=l[d];if(a[T]>=t)continue;const E=h*n+T;if(!c.has(E)&&(c.add(E),o.push(h,T),a[h]++,a[T]++,o.length>=i*2))break}}return Uint32Array.from(o)}}class Z0{lines;uniforms;connectionCount;geometry;material;constructor(e,t,i){const r=new K0(e.neural,We.connectionRadius).buildPairs(We.connectionRadius,We.maxNeighboursPerNode,i),a=r.length/2;this.connectionCount=a;const o=a*2,c=new Float32Array(o*3),l=new Float32Array(o*3),h=new Float32Array(o*3),p=new Float32Array(o*3),u=new Float32Array(o*3),m=new Float32Array(o),g=new Float32Array(o),x=new Float32Array(o),f=new Float32Array(o),d=(T,E,S,M)=>{E[M*3]=T[S*3],E[M*3+1]=T[S*3+1],E[M*3+2]=T[S*3+2]};for(let T=0;T<a;T++){const E=r[T*2],S=r[T*2+1],M=e.neural[E*3]-e.neural[S*3],b=e.neural[E*3+1]-e.neural[S*3+1],R=e.neural[E*3+2]-e.neural[S*3+2],_=Math.hypot(M,b,R),w=1-Math.min(1,_/We.connectionRadius)*.75,L=zh(T+1);for(let C=0;C<2;C++){const I=C===0?E:S,H=T*2+C;d(e.neural,c,I,H),d(e.reactor,l,I,H),d(e.data,h,I,H),d(e.energy,p,I,H),d(e.scanner,u,I,H),m[H]=e.seeds[I],g[H]=C,x[H]=w,f[H]=L}}this.geometry=new it,this.geometry.setAttribute("position",new Ie(c,3)),this.geometry.setAttribute("aReactor",new Ie(l,3)),this.geometry.setAttribute("aData",new Ie(h,3)),this.geometry.setAttribute("aEnergy",new Ie(p,3)),this.geometry.setAttribute("aScanner",new Ie(u,3)),this.geometry.setAttribute("aSeed",new Ie(m,1)),this.geometry.setAttribute("aEnd",new Ie(g,1)),this.geometry.setAttribute("aStrength",new Ie(x,1)),this.geometry.setAttribute("aLineSeed",new Ie(f,1)),this.geometry.boundingSphere=new ui(new P,12),this.uniforms={...t,uColorLine:{value:new te(ve.cyanDim)},uColorHot:{value:new te(ve.iceBlue)},uWarmLine:{value:new te(ve.goldDeep)},uWarmHot:{value:new te(ve.gold)},uWarm:{value:0},uOpacity:{value:.5},uTravelSpeed:{value:.42}},this.material=new et({defines:{...Rh},uniforms:this.uniforms,vertexShader:Ze.neural.vert,fragmentShader:Ze.neural.frag,transparent:!0,depthWrite:!1,blending:Qe}),this.lines=new ch(this.geometry,this.material),this.lines.frustumCulled=!1,this.lines.renderOrder=5,this.lines.name="neural-connections"}dispose(){this.geometry.dispose(),this.material.dispose()}}function J0(s=128){const e=document.createElement("canvas");e.width=s,e.height=s;const t=e.getContext("2d");if(t){const n=t.createRadialGradient(s/2,s/2,0,s/2,s/2,s/2);n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.22,"rgba(200,250,255,0.72)"),n.addColorStop(.55,"rgba(60,200,230,0.18)"),n.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=n,t.fillRect(0,0,s,s)}const i=new as(e);return i.colorSpace=Vt,i.needsUpdate=!0,i}class Q0{group=new Bt;light;plasma;shell;ring;rays;glow;disposables=[];plasmaUniforms;shellUniforms;rayUniforms;pulse=0;raySpin=0;cyanColor=new te(ve.cyan);goldColor=new te(ve.gold);constructor(){this.group.name="energy-core";const e=new Bi(.185,32,24),t=new Vi({color:1547}),i=new rt(e,t);i.renderOrder=1,this.group.add(i),this.disposables.push(e,t),this.plasmaUniforms={uTime:{value:0},uColorA:{value:new te(ve.cyanDim)},uColorB:{value:new te(ve.white)},uWarmA:{value:new te(ve.goldDeep)},uWarmB:{value:new te(ve.gold)},uWarm:{value:0},uIntensity:{value:.85},uOpacity:{value:.7},uFresnelPower:{value:2.1},uFresnelBoost:{value:.85},uNoiseScale:{value:5.5},uFlow:{value:.35},uPulse:{value:0}};const n=new Bi(.225,48,36),r=new et({uniforms:this.plasmaUniforms,vertexShader:Ze.core.vert,fragmentShader:Ze.core.frag,transparent:!0,depthWrite:!1,blending:Qe});this.plasma=new rt(n,r),this.plasma.renderOrder=2,this.group.add(this.plasma),this.disposables.push(n,r);const a=new al(.33,.006,8,96),o=new Vi({color:ve.iceBlue,transparent:!0,opacity:.75,blending:Qe,depthWrite:!1});this.ring=new rt(a,o),this.ring.rotation.x=Math.PI*.32,this.ring.renderOrder=3,this.group.add(this.ring),this.disposables.push(a,o),this.rayUniforms={uTime:{value:0},uColor:{value:new te(ve.cyan)},uWarmColor:{value:new te(ve.gold)},uWarm:{value:0},uOpacity:{value:.4},uEnergy:{value:.4},uInner:{value:.24},uOuter:{value:.52},uFeather:{value:.12},uSegments:{value:64},uDashRatio:{value:.16},uSegmentSpin:{value:.18},uSweep:{value:0},uSweepSpeed:{value:0},uSweepWidth:{value:.2},uGapStart:{value:0},uGapSize:{value:0}};const c=new Gi(.2,.56,96,1),l=new et({uniforms:this.rayUniforms,vertexShader:Ze.hologram.vert,fragmentShader:Ze.hologram.frag,transparent:!0,depthWrite:!1,side:Ot,blending:Qe});this.rays=new rt(c,l),this.rays.renderOrder=3,this.group.add(this.rays),this.disposables.push(c,l),this.shellUniforms={uTime:{value:0},uColorA:{value:new te(ve.cyanDim)},uColorB:{value:new te(ve.iceBlue)},uWarmA:{value:new te(ve.goldDeep)},uWarmB:{value:new te(ve.amber)},uWarm:{value:0},uIntensity:{value:.42},uOpacity:{value:.3},uFresnelPower:{value:3.4},uFresnelBoost:{value:1},uNoiseScale:{value:2.4},uFlow:{value:.16},uPulse:{value:0}};const h=new Bi(.44,48,36),p=new et({uniforms:this.shellUniforms,vertexShader:Ze.core.vert,fragmentShader:Ze.core.frag,transparent:!0,depthWrite:!1,side:ki,blending:Qe});this.shell=new rt(h,p),this.shell.renderOrder=4,this.group.add(this.shell),this.disposables.push(h,p);const u=J0(),m=new Yr({map:u,color:ve.cyan,transparent:!0,opacity:.55,blending:Qe,depthWrite:!1,depthTest:!1});this.glow=new el(m),this.glow.scale.setScalar(.9),this.glow.renderOrder=0,this.group.add(this.glow),this.disposables.push(u,m),this.light=new Uo(ve.cyan,ti.coreLightIntensity,9,1.7),this.group.add(this.light)}update(e,t,i,n,r){const a=.5+.28*Math.sin(t*1.15)+.14*Math.sin(t*2.37+1.1)+.08*Math.sin(t*.61+2.4);this.pulse=Ke(this.pulse,r,6,e);const o=a*(.55+i*.9)+this.pulse*.9;this.plasmaUniforms.uTime.value=t,this.plasmaUniforms.uPulse.value=o,this.plasmaUniforms.uWarm.value=n,this.plasmaUniforms.uIntensity.value=.7+i*.75+this.pulse*.7,this.shellUniforms.uTime.value=t,this.shellUniforms.uPulse.value=o*.6,this.shellUniforms.uWarm.value=n,this.shellUniforms.uOpacity.value=.28+i*.3,this.rayUniforms.uTime.value=t,this.rayUniforms.uWarm.value=n,this.rayUniforms.uEnergy.value=.25+i*.9+this.pulse,this.rayUniforms.uOpacity.value=.22+i*.35;const c=1+o*.06;this.plasma.scale.setScalar(c),this.shell.scale.setScalar(1+o*.025),this.ring.rotation.z+=e*(.6+i*1.8),this.ring.rotation.y+=e*.21,this.raySpin-=e*(.12+i*.4);const l=ii(.85,1.5,i)*(1+this.pulse*.3);this.glow.scale.setScalar(l);const h=this.glow.material;h.opacity=.32+i*.3,h.color.copy(this.cyanColor).lerp(this.goldColor,n),this.light.intensity=ti.coreLightIntensity*(.55+i*.9+this.pulse*.8),this.light.color.copy(this.cyanColor).lerp(this.goldColor,n)}faceCamera(e){this.rays.quaternion.copy(e),this.rays.rotateZ(this.raySpin)}dispose(){for(const e of this.disposables)e.dispose()}}const Cc=[{name:"inner",inner:.45,outer:.4688,feather:.0045,opacity:.85,segments:0,dashRatio:1,segmentSpin:0,sweep:!1,sweepSpeed:0,sweepWidth:.2,gapStart:0,gapSize:0,tiltX:.34,tiltY:.12,spin:.55,wobbleAmplitude:.02,wobbleSpeed:.7,color:ve.iceBlue,scanResponse:.6},{name:"energy",inner:.57,outer:.6112,feather:.015,opacity:.6,segments:0,dashRatio:1,segmentSpin:0,sweep:!0,sweepSpeed:1.15,sweepWidth:.34,gapStart:0,gapSize:0,tiltX:-.52,tiltY:.4,spin:-.32,wobbleAmplitude:.05,wobbleSpeed:.43,color:ve.cyan,scanResponse:1},{name:"segmented",inner:.705,outer:.75,feather:.006,opacity:.75,segments:48,dashRatio:.56,segmentSpin:.05,sweep:!1,sweepSpeed:0,sweepWidth:.2,gapStart:0,gapSize:0,tiltX:1.32,tiltY:-.18,spin:.28,wobbleAmplitude:.03,wobbleSpeed:.31,color:ve.cyan,scanResponse:.8},{name:"technical",inner:.825,outer:.9,feather:.009,opacity:.42,segments:12,dashRatio:.74,segmentSpin:-.09,sweep:!1,sweepSpeed:0,sweepWidth:.2,gapStart:0,gapSize:0,tiltX:-.22,tiltY:.86,spin:-.19,wobbleAmplitude:.07,wobbleSpeed:.24,color:ve.cyanDim,scanResponse:.5},{name:"radial-thin",inner:.7837,outer:.7913,feather:.003,opacity:.9,segments:0,dashRatio:1,segmentSpin:0,sweep:!1,sweepSpeed:0,sweepWidth:.2,gapStart:0,gapSize:0,tiltX:.06,tiltY:-.05,spin:.09,wobbleAmplitude:.012,wobbleSpeed:.9,color:ve.iceBlue,scanResponse:.3},{name:"dotted",inner:.93,outer:.9465,feather:.0045,opacity:.7,segments:140,dashRatio:.28,segmentSpin:.11,sweep:!1,sweepSpeed:0,sweepWidth:.2,gapStart:0,gapSize:0,tiltX:.98,tiltY:.34,spin:-.42,wobbleAmplitude:.02,wobbleSpeed:.52,color:ve.cyan,scanResponse:.9},{name:"broken",inner:1.065,outer:1.1025,feather:.0075,opacity:.5,segments:0,dashRatio:1,segmentSpin:0,sweep:!1,sweepSpeed:0,sweepWidth:.2,gapStart:.6,gapSize:1.55,tiltX:-1.18,tiltY:.2,spin:.23,wobbleAmplitude:.045,wobbleSpeed:.19,color:ve.cyanDim,scanResponse:.7},{name:"scanning",inner:1.14,outer:1.2,feather:.015,opacity:.55,segments:0,dashRatio:1,segmentSpin:0,sweep:!0,sweepSpeed:.62,sweepWidth:.28,gapStart:0,gapSize:0,tiltX:.42,tiltY:-.62,spin:-.14,wobbleAmplitude:.03,wobbleSpeed:.36,color:ve.iceBlue,scanResponse:1.4},{name:"data",inner:1.29,outer:1.35,feather:.0075,opacity:.34,segments:220,dashRatio:.42,segmentSpin:-.22,sweep:!1,sweepSpeed:0,sweepWidth:.2,gapStart:0,gapSize:0,tiltX:1.5,tiltY:.1,spin:.16,wobbleAmplitude:.025,wobbleSpeed:.28,color:ve.cyan,scanResponse:1.1}];class j0{group=new Bt;rings=[];disposables=[];baseColor=new te;warmColor=new te(ve.gold);constructor(){this.group.name="orbital-rings",Cc.forEach((e,t)=>{const i=new Gi(e.inner*.92,e.outer*1.08,Math.max(96,Math.min(256,Math.round(e.segments*1.5)||128)),1),n={uTime:{value:0},uColor:{value:new te(e.color)},uWarmColor:{value:new te(ve.gold)},uWarm:{value:0},uOpacity:{value:e.opacity},uEnergy:{value:.3},uInner:{value:e.inner},uOuter:{value:e.outer},uFeather:{value:e.feather},uSegments:{value:e.segments},uDashRatio:{value:e.dashRatio},uSegmentSpin:{value:e.segmentSpin},uSweep:{value:e.sweep?1:0},uSweepSpeed:{value:e.sweepSpeed},uSweepWidth:{value:e.sweepWidth},uGapStart:{value:e.gapStart},uGapSize:{value:e.gapSize}},r=new et({uniforms:n,vertexShader:Ze.hologram.vert,fragmentShader:Ze.hologram.frag,transparent:!0,depthWrite:!1,side:Ot,blending:Qe}),a=new rt(i,r);a.frustumCulled=!1,a.renderOrder=7;const o=new Bt;o.rotation.set(e.tiltX,e.tiltY,0),o.add(a),this.group.add(o),this.rings.push({config:e,holder:o,mesh:a,uniforms:n,phase:t/Cc.length*Nt}),this.disposables.push(i,r)})}update(e,t,i,n,r){const a=en.scanSpeedIdle+(en.scanSpeedActive-en.scanSpeedIdle)*r;for(const o of this.rings){const{config:c,uniforms:l}=o;l.uTime.value=t,l.uWarm.value=n,l.uEnergy.value=.22+i*.95,l.uOpacity.value=c.opacity*(.65+i*.5),c.sweep&&(l.uSweepSpeed.value=c.sweepSpeed*a*c.scanResponse),l.uColor.value.copy(this.baseColor.set(c.color)).lerp(this.warmColor,n*.85),o.mesh.rotation.z+=e*c.spin*(.6+i*1.6);const h=Math.sin(t*c.wobbleSpeed+o.phase)*c.wobbleAmplitude,p=Math.cos(t*c.wobbleSpeed*.73+o.phase)*c.wobbleAmplitude;o.holder.rotation.x=c.tiltX+h,o.holder.rotation.y=c.tiltY+p}}setVisible(e){this.group.visible=e}dispose(){for(const e of this.disposables)e.dispose()}}class ev{points;uniforms;geometry;material;constructor(e,t,i=8821){const n=Us(i),r=new Float32Array(e*3),a=new Float32Array(e),o=new Float32Array(e),c=new Float32Array(e),l=new Float32Array(e),h=new Float32Array(e),p=new Float32Array(e),u=new Float32Array(e),m=new Float32Array(e);for(let g=0;g<e;g++){const x=n();a[g]=x<.5?0:x<.72?1:x<.88?2:3,o[g]=1.15+n()*1.5,c[g]=(.12+n()*.5)*(n()<.35?-1:1),l[g]=n(),h[g]=4+n()*9,p[g]=1+n()*2.2,u[g]=(n()-.5)*Math.PI*.85,m[g]=n()*Nt}this.geometry=new it,this.geometry.setAttribute("position",new Ie(r,3)),this.geometry.setAttribute("aType",new Ie(a,1)),this.geometry.setAttribute("aRadius",new Ie(o,1)),this.geometry.setAttribute("aSpeed",new Ie(c,1)),this.geometry.setAttribute("aPhase",new Ie(l,1)),this.geometry.setAttribute("aLife",new Ie(h,1)),this.geometry.setAttribute("aSize",new Ie(p,1)),this.geometry.setAttribute("aTilt",new Ie(u,1)),this.geometry.setAttribute("aSeed",new Ie(m,1)),this.geometry.boundingSphere=new ui(new P,12),this.uniforms={uTime:{value:0},uPixelRatio:{value:t},uSizeScale:{value:2.2},uOrbScale:{value:1},uEnergy:{value:.3},uColor:{value:new te(ve.cyanDim)},uHotColor:{value:new te(ve.iceBlue)},uWarmColor:{value:new te(ve.gold)},uWarm:{value:0},uOpacity:{value:.85}},this.material=new et({uniforms:this.uniforms,vertexShader:Ze.motes.vert,fragmentShader:Ze.motes.frag,transparent:!0,depthWrite:!1,blending:Qe}),this.points=new hs(this.geometry,this.material),this.points.frustumCulled=!1,this.points.renderOrder=4,this.points.name="data-motes"}update(e,t,i,n){this.uniforms.uTime.value=e,this.uniforms.uEnergy.value=t,this.uniforms.uWarm.value=i,this.uniforms.uOrbScale.value=n}setPixelRatio(e){this.uniforms.uPixelRatio.value=e}dispose(){this.geometry.dispose(),this.material.dispose()}}const Oa=new Float32Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]),tv=1/3,Mi=1/6;class jn{perm=new Uint8Array(512);permMod12=new Uint8Array(512);constructor(e=1337){const t=Us(e),i=new Uint8Array(256);for(let n=0;n<256;n++)i[n]=n;for(let n=255;n>0;n--){const r=Math.floor(t()*(n+1)),a=i[n];i[n]=i[r],i[r]=a}for(let n=0;n<512;n++)this.perm[n]=i[n&255],this.permMod12[n]=this.perm[n]%12}static dot(e,t,i,n){const r=e*3;return Oa[r]*t+Oa[r+1]*i+Oa[r+2]*n}noise3(e,t,i){const n=(e+t+i)*tv,r=Math.floor(e+n),a=Math.floor(t+n),o=Math.floor(i+n),c=(r+a+o)*Mi,l=e-(r-c),h=t-(a-c),p=i-(o-c);let u,m,g,x,f,d;l>=h?h>=p?(u=1,m=0,g=0,x=1,f=1,d=0):l>=p?(u=1,m=0,g=0,x=1,f=0,d=1):(u=0,m=0,g=1,x=1,f=0,d=1):h<p?(u=0,m=0,g=1,x=0,f=1,d=1):l<p?(u=0,m=1,g=0,x=0,f=1,d=1):(u=0,m=1,g=0,x=1,f=1,d=0);const T=l-u+Mi,E=h-m+Mi,S=p-g+Mi,M=l-x+2*Mi,b=h-f+2*Mi,R=p-d+2*Mi,_=l-1+3*Mi,w=h-1+3*Mi,L=p-1+3*Mi,C=r&255,I=a&255,H=o&255;let X=0,F=0,W=0,G=0,$=.6-l*l-h*h-p*p;$>0&&($*=$,X=$*$*jn.dot(this.permMod12[C+this.perm[I+this.perm[H]]],l,h,p));let Q=.6-T*T-E*E-S*S;Q>0&&(Q*=Q,F=Q*Q*jn.dot(this.permMod12[C+u+this.perm[I+m+this.perm[H+g]]],T,E,S));let ie=.6-M*M-b*b-R*R;ie>0&&(ie*=ie,W=ie*ie*jn.dot(this.permMod12[C+x+this.perm[I+f+this.perm[H+d]]],M,b,R));let se=.6-_*_-w*w-L*L;return se>0&&(se*=se,G=se*se*jn.dot(this.permMod12[C+1+this.perm[I+1+this.perm[H+1]]],_,w,L)),32*(X+F+W+G)}fbm(e,t,i,n=4,r=2.05,a=.5){let o=.5,c=1,l=0;for(let h=0;h<n;h++)l+=o*this.noise3(e*c,t*c,i*c),c*=r,o*=a;return l}curl(e,t,i,n,r){const a=this.noise3(e,t+n,i),o=this.noise3(e,t-n,i),c=this.noise3(e,t,i+n),l=this.noise3(e,t,i-n),h=this.noise3(e+n,t,i),p=this.noise3(e-n,t,i),u=1/(2*n);r[0]=(a-o-(c-l))*u,r[1]=(c-l-(h-p))*u,r[2]=(h-p-(a-o))*u}}const li=["NEURAL","REACTOR","DATA","ENERGY","SCANNER"],xr={NEURAL:"NEURAL NETWORK",REACTOR:"REACTOR CORE",DATA:"DATA SPHERE",ENERGY:"ENERGY FIELD",SCANNER:"SCANNER ARRAY"},iv={NEURAL:{lineOpacity:1,noiseAmp:1,warm:0,spin:1,particleBoost:1},REACTOR:{lineOpacity:.2,noiseAmp:.3,warm:0,spin:1.45,particleBoost:1.3},DATA:{lineOpacity:.14,noiseAmp:.25,warm:0,spin:.75,particleBoost:1},ENERGY:{lineOpacity:.24,noiseAmp:1.25,warm:1,spin:1.2,particleBoost:1.25},SCANNER:{lineOpacity:.22,noiseAmp:.45,warm:0,spin:.9,particleBoost:.95}};function _r(s,e){const t=s()*2-1,i=s()*Nt,n=Math.sqrt(Math.max(0,1-t*t));e.x=n*Math.cos(i),e.y=n*Math.sin(i),e.z=t}function nv(s,e=20260813){const t=Us(e),i=new jn(e),n=new Float32Array(s*3),r=new Float32Array(s*3),a=new Float32Array(s*3),o=new Float32Array(s*3),c=new Float32Array(s*3),l=new Float32Array(s),h=new Float32Array(s),p=new Float32Array(s),u=[],m={x:0,y:0,z:0};for(let d=0;d<We.clusterCount;d++){_r(t,m);const T=.42+t()*.5;u.push(m.x*T,m.y*T,m.z*T)}const g=[.42,.56,.68,.79,.9,1,1.08],x=g.map((d,T)=>(T%2===0?1:-1)*(.1+T*.14)),f=new Float32Array(3);for(let d=0;d<s;d++){const T=d/s;p[d]=t(),_r(t,m);let E=ii(We.innerRadius,1,Math.pow(t(),.55)),S=m.x*E,M=m.y*E,b=m.z*E;const R=t()*We.clusterCount|0,_=Math.pow(t(),2.2)*.72;S=ii(S,u[R*3],_),M=ii(M,u[R*3+1],_),b=ii(b,u[R*3+2],_);const w=i.fbm(S*1.9,M*1.9,b*1.9,3)*.22,L=Math.max(1e-4,Math.hypot(S,M,b));S+=S/L*w,M+=M/L*w,b+=b/L*w,n[d*3]=S,n[d*3+1]=M,n[d*3+2]=b;const C=Math.hypot(S,M,b);h[d]=Oi(C/1.15,0,1);const I=t()*g.length|0,H=g[I],X=24+I*12,F=Math.floor(t()*X)/X*Nt+(t()-.5)*.035,W=(t()-.5)*.045,G=x[I],$=Math.cos(F)*(H+W),Q=Math.sin(F)*(H+W),ie=(t()-.5)*.05+Math.sin(F*3)*.03;r[d*3]=$,r[d*3+1]=Q*Math.cos(G)-ie*Math.sin(G),r[d*3+2]=Q*Math.sin(G)+ie*Math.cos(G);const se=44,be=(Math.floor(T*se)+(t()<.06?1:0)+.5)/se*Math.PI,He=Math.max(6,Math.round(Math.sin(be)*128)),K=Math.floor(t()*He)/He*Nt,re=.94+(t()<.12?.09:0)-(t()<.1?.08:0);a[d*3]=Math.sin(be)*Math.cos(K)*re,a[d*3+1]=Math.cos(be)*re,a[d*3+2]=Math.sin(be)*Math.sin(K)*re,_r(t,m);const ee=ii(.62,1.22,Math.pow(t(),.7));let Ce=m.x*ee,Ne=m.y*ee,Pe=m.z*ee;i.curl(Ce*1.3,Ne*1.3,Pe*1.3,.16,f),Ce+=f[0]*.38,Ne+=f[1]*.38,Pe+=f[2]*.38,o[d*3]=Ce,o[d*3+1]=Ne,o[d*3+2]=Pe,_r(t,m);const gt=7,Ve=t()*gt|0,tt=ii(-.85,.85,Ve/(gt-1));if(t()<.55){const ft=Math.sqrt(Math.max(0,1.0404-tt*tt)),Mt=t()*Nt;c[d*3]=Math.cos(Mt)*ft,c[d*3+1]=tt+(t()-.5)*.012,c[d*3+2]=Math.sin(Mt)*ft}else{const ft=1.02+(t()-.5)*.03;c[d*3]=m.x*ft,c[d*3+1]=m.y*ft,c[d*3+2]=m.z*ft}const Ge=t();let vt=1.5+t()*1.6;Ge>.985?vt=5.2+t()*2.6:Ge>.92&&(vt=3+t()*1.4),l[d]=vt}return{count:s,neural:n,reactor:r,data:a,energy:o,scanner:c,sizes:l,layers:h,seeds:p}}function sv(s){const e=[0,0,0,0,0];return e[li.indexOf(s)]=1,e}const rv=new P(1,0,0);class av{group=new Bt;core;rings;particles;network;motes;geometryData;shared=Y0();tier;pixelRatio;weights=[1,0,0,0,0];targetWeights=[1,0,0,0,0];currentMode="NEURAL";energy=.22;energyTarget=.22;warm=0;warmTarget=0;scale=1;scaleTarget=1;contract=0;contractTarget=0;formation=0;formationTarget=0;burstTimer=-1;pulseSlot=0;idlePulseTimer=vn.idleInterval*.5;corePulse=0;angularVelocity=new we;spinPhase=0;reducedMotion=!1;handWorld=[null,null];handStrength=[0,0];tmpVec=new P;tmpQuat=new Hi;tmpQuat2=new Hi;constructor(e,t){this.tier=e,this.pixelRatio=t,this.group.name="neural-orb",this.group.scale.setScalar(We.radius),this.core=new Q0,this.rings=new j0,this.group.add(this.core.group),this.group.add(this.rings.group),this.buildSystems()}buildSystems(){const e=ns[this.tier];this.geometryData=nv(e.particles),this.particles=new $0(this.geometryData,this.shared,this.pixelRatio),this.network=new Z0(this.geometryData,this.shared,e.connections),this.motes=new ev(e.motes,this.pixelRatio),this.group.add(this.particles.points),this.group.add(this.network.lines),this.group.add(this.motes.points)}setQuality(e){e!==this.tier&&(this.tier=e,this.group.remove(this.particles.points),this.group.remove(this.network.lines),this.group.remove(this.motes.points),this.particles.dispose(),this.network.dispose(),this.motes.dispose(),this.buildSystems())}setPixelRatio(e){this.pixelRatio=e,this.particles.setPixelRatio(e),this.motes.setPixelRatio(e)}setReducedMotion(e){this.reducedMotion=e}get stats(){return{particles:this.geometryData.count,connections:this.network.connectionCount,motes:ns[this.tier].motes}}get mode(){return this.currentMode}get activation(){return this.energy}get warmth(){return this.warm}get currentScale(){return this.scale}setHand(e,t,i=1){this.handWorld[e]=t,this.handStrength[e]=t?Rt(i):0}setEnergyTarget(e){this.energyTarget=Rt(e)}setWarmTarget(e){this.warmTarget=Rt(e)}setScaleTarget(e){this.scaleTarget=Oi(e,We.minScale,We.maxScale)}nudgeScale(e){this.setScaleTarget(this.scaleTarget+e)}get scaleTargetValue(){return this.scaleTarget}applyRotation(e,t){this.angularVelocity.x+=t,this.angularVelocity.y+=e}setContract(e){this.contractTarget=Rt(e)}triggerBurst(){this.burstTimer>=0&&this.burstTimer<We.burstDuration*.35||(this.burstTimer=0,this.firePulse(),this.corePulse=1)}setMode(e){e!==this.currentMode&&(this.currentMode=e,this.targetWeights=sv(e))}cycleMode(e){const t=li.indexOf(this.currentMode),i=li[(t+e+li.length)%li.length];return this.setMode(i),i}firePulse(e){const t=this.shared.uPulses.value,i=t[this.pulseSlot%t.length];this.pulseSlot++,e?i.set(e.x,e.y,e.z,this.shared.uTime.value):i.set(0,0,0,this.shared.uTime.value),this.corePulse=Math.max(this.corePulse,.75)}startFormation(){this.formation=0,this.formationTarget=1}completeFormation(){this.formation=1,this.formationTarget=1}get formationProgress(){return this.formation}resetOrientation(){this.group.quaternion.identity(),this.angularVelocity.set(0,0),this.scaleTarget=1,this.setMode("NEURAL"),this.contractTarget=0}update(e,t,i){const n=this.shared;n.uTime.value=t;const r=1/Math.max(.05,We.modeBlendSeconds);let a=0;for(let E=0;E<this.weights.length;E++)this.weights[E]=Ke(this.weights[E],this.targetWeights[E],r*4,e),a+=this.weights[E];if(a>0)for(let E=0;E<this.weights.length;E++)this.weights[E]/=a;let o=0,c=0,l=0,h=0,p=0;for(let E=0;E<li.length;E++){const S=iv[li[E]],M=this.weights[E];o+=S.lineOpacity*M,c+=S.noiseAmp*M,l+=S.warm*M,h+=S.spin*M,p+=S.particleBoost*M}n.uModeWeights.value.set(this.weights[0],this.weights[1],this.weights[2],this.weights[3]),n.uModeScanner.value=this.weights[4],this.energy=Ke(this.energy,this.energyTarget,3.4,e),this.warm=Ke(this.warm,Math.max(this.warmTarget,l),2.6,e),this.scale=Ke(this.scale,this.scaleTarget,We.scaleDamping,e),this.contract=Ke(this.contract,this.contractTarget,We.contractDamping,e);const u=e/Math.max(.05,We.formationSeconds);this.formation=Rt(this.formation+Math.sign(this.formationTarget-this.formation)*u),this.corePulse=Math.max(0,this.corePulse-e*1.8);let m=0;if(this.burstTimer>=0){this.burstTimer+=e;const E=this.burstTimer/We.burstDuration;if(E>=1)this.burstTimer=-1;else{const S=Rt(E/.09),M=Math.exp(-E*3.4);m=S*M*We.burstDistance}}this.spinPhase+=e;const g=this.reducedMotion?0:We.idleSpin*h;this.angularVelocity.multiplyScalar(Math.pow(We.rotationFriction,e*60)),this.angularVelocity.lengthSq()<1e-8&&this.angularVelocity.set(0,0);const x=this.angularVelocity.y*e+g*e,f=this.angularVelocity.x*e+Math.sin(this.spinPhase*.21)*e*.012;this.tmpQuat.setFromAxisAngle(Pt.DEFAULT_UP,x),this.group.quaternion.premultiply(this.tmpQuat),this.tmpQuat.setFromAxisAngle(rv,f),this.group.quaternion.premultiply(this.tmpQuat),this.group.updateMatrixWorld(!0);for(let E=0;E<2;E++){const S=n[E===0?"uHandA":"uHandB"].value,M=this.handWorld[E];if(!M){S.set(0,0,0,0);continue}this.tmpVec.copy(M),this.group.worldToLocal(this.tmpVec);const b=Math.max(.001,this.scale);S.set(this.tmpVec.x/b,this.tmpVec.y/b,this.tmpVec.z/b,this.handStrength[E])}if(n.uFormation.value=this.formation,n.uContract.value=this.contract,n.uBurst.value=m,n.uOrbScale.value=this.scale,n.uEnergy.value=this.energy,n.uNoiseAmp.value=We.noiseAmplitude*c*(this.reducedMotion?.35:1),n.uBreath.value=this.reducedMotion?.2:1,this.particles.uniforms.uWarm.value=this.warm,this.particles.uniforms.uPointBoost.value=p,this.particles.uniforms.uOpacity.value=ii(.35,1,this.formation),this.network.uniforms.uWarm.value=this.warm,this.network.uniforms.uOpacity.value=o*ii(.1,.55,this.formation)*1.6,this.network.uniforms.uTravelSpeed.value=this.reducedMotion?.12:.42+this.energy*.5,this.idlePulseTimer-=e,this.idlePulseTimer<=0&&this.formation>.75){this.idlePulseTimer=vn.idleInterval*(.5+Math.random());const E=Math.random()*this.geometryData.count|0;this.tmpVec.set(this.geometryData.neural[E*3],this.geometryData.neural[E*3+1],this.geometryData.neural[E*3+2]),this.firePulse(this.tmpVec)}const d=Math.max(this.handStrength[0],this.handStrength[1]);this.core.update(e,t,this.energy,this.warm,this.corePulse),this.tmpQuat2.copy(this.group.quaternion).invert().multiply(i.quaternion),this.core.faceCamera(this.tmpQuat2),this.rings.update(e,t,this.energy,this.warm,d),this.motes.update(t,this.energy,this.warm,this.scale);const T=ii(1,this.scale,.55)*(1-this.contract*.25);this.core.group.scale.setScalar(T),this.rings.group.scale.setScalar(ii(1,this.scale,.8))}dispose(){this.particles.dispose(),this.network.dispose(),this.motes.dispose(),this.core.dispose(),this.rings.dispose()}}const ov=new P(0,1,0);class Pc{mesh;uniforms;geometry;material;midpoint=new P;direction=new P;quaternion=new Hi;opacity=0;targetOpacity=0;radius=.03;constructor(e=0){this.geometry=new rl(1,1,1,10,1,!0),this.uniforms={uTime:{value:0},uColor:{value:new te(ve.iceBlue)},uWarmColor:{value:new te(ve.gold)},uWarm:{value:0},uOpacity:{value:0},uFlowSpeed:{value:1.15},uSeed:{value:e*3.77}},this.material=new et({uniforms:this.uniforms,vertexShader:Ze.beam.vert,fragmentShader:Ze.beam.frag,transparent:!0,depthWrite:!1,side:Ot,blending:Qe}),this.mesh=new rt(this.geometry,this.material),this.mesh.frustumCulled=!1,this.mesh.visible=!1,this.mesh.renderOrder=9,this.mesh.name="holographic-beam"}setEndpoints(e,t){this.direction.subVectors(t,e);const i=this.direction.length();i<1e-4||(this.midpoint.addVectors(e,t).multiplyScalar(.5),this.direction.divideScalar(i),this.quaternion.setFromUnitVectors(ov,this.direction),this.mesh.position.copy(this.midpoint),this.mesh.quaternion.copy(this.quaternion),this.mesh.scale.set(this.radius,i,this.radius))}setActive(e){this.targetOpacity=e?1:0}setWarm(e){this.uniforms.uWarm.value=e}update(e,t){this.uniforms.uTime.value=t,this.opacity=Ke(this.opacity,this.targetOpacity,9,e),this.uniforms.uOpacity.value=this.opacity,this.radius=.018+this.opacity*.026,this.mesh.visible=this.opacity>.01}dispose(){this.geometry.dispose(),this.material.dispose()}}const dn=140,lv=.035;class Lc{points;geometry;material;uniforms;positions=new Float32Array(dn*3);births=new Float32Array(dn).fill(-1e3);lives=new Float32Array(dn);sizes=new Float32Array(dn);charges=new Float32Array(dn);last=new P(1/0,1/0,1/0);cursor=0;constructor(e){for(let t=0;t<dn;t++)this.lives[t]=.55,this.sizes[t]=3.4;this.geometry=new it,this.geometry.setAttribute("position",new Ie(this.positions,3)),this.geometry.setAttribute("aBirth",new Ie(this.births,1)),this.geometry.setAttribute("aLife",new Ie(this.lives,1)),this.geometry.setAttribute("aSize",new Ie(this.sizes,1)),this.geometry.setAttribute("aCharge",new Ie(this.charges,1)),this.geometry.boundingSphere=new ui(new P,20),this.uniforms={uTime:{value:0},uPixelRatio:{value:e},uSizeScale:{value:2.6},uColor:{value:new te(ve.cyan)},uHotColor:{value:new te(ve.white)},uOpacity:{value:.9}},this.material=new et({uniforms:this.uniforms,vertexShader:Ze.trail.vert,fragmentShader:Ze.trail.frag,transparent:!0,depthWrite:!1,blending:Qe}),this.points=new hs(this.geometry,this.material),this.points.frustumCulled=!1,this.points.renderOrder=9,this.points.name="hand-trail"}emit(e,t,i,n){if(t<.35){this.last.copy(e);return}if(this.last.distanceTo(e)<lv)return;const r=this.cursor%dn;this.cursor++,this.positions[r*3]=e.x,this.positions[r*3+1]=e.y,this.positions[r*3+2]=e.z,this.births[r]=n,this.lives[r]=.4+Math.min(.45,t*.06),this.sizes[r]=2.6+Math.min(4.5,t*.9)+i*2.5,this.charges[r]=i,this.geometry.attributes.position.needsUpdate=!0,this.geometry.attributes.aBirth.needsUpdate=!0,this.geometry.attributes.aLife.needsUpdate=!0,this.geometry.attributes.aSize.needsUpdate=!0,this.geometry.attributes.aCharge.needsUpdate=!0,this.last.copy(e)}update(e){this.uniforms.uTime.value=e}setPixelRatio(e){this.uniforms.uPixelRatio.value=e}clear(){this.births.fill(-1e3),this.geometry.attributes.aBirth.needsUpdate=!0,this.last.set(1/0,1/0,1/0)}dispose(){this.geometry.dispose(),this.material.dispose()}}const fn=900;class cv{group=new Bt;sparks;ring;geometry;sparkUniforms;ringUniforms;disposables=[];births;lives;velocities;positions;cursor=0;ringAge=-1;time=0;constructor(e,t=991){this.group.name="particle-burst";const i=Us(t);this.positions=new Float32Array(fn*3),this.velocities=new Float32Array(fn*3),this.births=new Float32Array(fn).fill(-1e3),this.lives=new Float32Array(fn).fill(1);const n=new Float32Array(fn);for(let c=0;c<fn;c++)n[c]=1.4+i()*3.4;this.geometry=new it,this.geometry.setAttribute("position",new Ie(this.positions,3)),this.geometry.setAttribute("aVelocity",new Ie(this.velocities,3)),this.geometry.setAttribute("aBirth",new Ie(this.births,1)),this.geometry.setAttribute("aLife",new Ie(this.lives,1)),this.geometry.setAttribute("aSize",new Ie(n,1)),this.geometry.boundingSphere=new ui(new P,20),this.sparkUniforms={uTime:{value:0},uPixelRatio:{value:e},uSizeScale:{value:3},uColor:{value:new te(ve.cyan)},uHotColor:{value:new te(ve.white)},uOpacity:{value:1}};const r=new et({uniforms:this.sparkUniforms,vertexShader:Ze.burst.vert,fragmentShader:Ze.burst.frag,transparent:!0,depthWrite:!1,blending:Qe});this.sparks=new hs(this.geometry,r),this.sparks.frustumCulled=!1,this.sparks.renderOrder=8,this.group.add(this.sparks),this.disposables.push(this.geometry,r),this.ringUniforms={uTime:{value:0},uColor:{value:new te(ve.iceBlue)},uWarmColor:{value:new te(ve.gold)},uWarm:{value:0},uOpacity:{value:0},uEnergy:{value:1},uInner:{value:.86},uOuter:{value:1},uFeather:{value:.05},uSegments:{value:0},uDashRatio:{value:1},uSegmentSpin:{value:0},uSweep:{value:0},uSweepSpeed:{value:0},uSweepWidth:{value:.2},uGapStart:{value:0},uGapSize:{value:0}};const a=new Gi(.8,1.05,128,1),o=new et({uniforms:this.ringUniforms,vertexShader:Ze.hologram.vert,fragmentShader:Ze.hologram.frag,transparent:!0,depthWrite:!1,side:Ot,blending:Qe});this.ring=new rt(a,o),this.ring.visible=!1,this.ring.renderOrder=8,this.group.add(this.ring),this.disposables.push(a,o)}fire(e,t,i=420,n=4.2,r=0){const a=this.geometry.attributes,o=Math.random;for(let c=0;c<i;c++){const l=this.cursor%fn;this.cursor++;const h=o()*2-1,p=o()*Math.PI*2,u=Math.sqrt(Math.max(0,1-h*h)),m=u*Math.cos(p),g=u*Math.sin(p),x=h;this.positions[l*3]=e.x+m*t,this.positions[l*3+1]=e.y+g*t,this.positions[l*3+2]=e.z+x*t;const f=n*(.45+o()*.85);this.velocities[l*3]=m*f,this.velocities[l*3+1]=g*f,this.velocities[l*3+2]=x*f,this.births[l]=this.time,this.lives[l]=.85+o()*.9}a.position.needsUpdate=!0,a.aVelocity.needsUpdate=!0,a.aBirth.needsUpdate=!0,a.aLife.needsUpdate=!0,this.sparkUniforms.uColor.value.set(r>.5?ve.gold:ve.cyan),this.ringUniforms.uWarm.value=r,this.ring.position.copy(e),this.ring.visible=!0,this.ringAge=0}update(e,t,i){if(this.time=t,this.sparkUniforms.uTime.value=t,this.ringUniforms.uTime.value=t,this.ringAge>=0){this.ringAge+=e;const r=this.ringAge/1.05;if(r>=1)this.ringAge=-1,this.ring.visible=!1;else{const a=1-Math.pow(1-r,2.4);this.ring.scale.setScalar(.6+a*4.2),this.ringUniforms.uOpacity.value=(1-r)*.9,this.ring.quaternion.copy(i)}}}setPixelRatio(e){this.sparkUniforms.uPixelRatio.value=e}dispose(){for(const e of this.disposables)e.dispose()}}const hv=[{inner:.115,outer:.125,segments:0,dashRatio:1,spin:0,opacity:.85},{inner:.15,outer:.185,segments:4,dashRatio:.22,spin:.15,opacity:.9},{inner:.135,outer:.145,segments:16,dashRatio:.35,spin:-.9,opacity:.55}];class uv{group=new Bt;rings=[];dot;disposables=[];opacity=0;targetOpacity=0;lockAmount=0;targetLock=0;constructor(){this.group.name="fingertip-reticle",this.group.visible=!1;const e=new sl(.028,20),t=new Vi({color:ve.white,transparent:!0,opacity:.95,blending:Qe,depthWrite:!1,depthTest:!1});this.dot=new rt(e,t),this.group.add(this.dot),this.disposables.push(e,t);for(const i of hv){const n={uTime:{value:0},uColor:{value:new te(ve.cyan)},uWarmColor:{value:new te(ve.amber)},uWarm:{value:0},uOpacity:{value:i.opacity},uEnergy:{value:.8},uInner:{value:i.inner},uOuter:{value:i.outer},uFeather:{value:.004},uSegments:{value:i.segments},uDashRatio:{value:i.dashRatio},uSegmentSpin:{value:i.spin},uSweep:{value:0},uSweepSpeed:{value:0},uSweepWidth:{value:.2},uGapStart:{value:0},uGapSize:{value:0}},r=new Gi(i.inner*.85,i.outer*1.15,96,1),a=new et({uniforms:n,vertexShader:Ze.hologram.vert,fragmentShader:Ze.hologram.frag,transparent:!0,depthWrite:!1,depthTest:!1,side:Ot,blending:Qe}),o=new rt(r,a);o.frustumCulled=!1,this.group.add(o),this.rings.push({mesh:o,spec:i,uniforms:n}),this.disposables.push(r,a)}this.group.renderOrder=12}setActive(e){this.targetOpacity=e?1:0}setLocked(e){this.targetLock=e?1:0}update(e,t,i,n){if(this.opacity=Ke(this.opacity,this.targetOpacity,10,e),this.lockAmount=Ke(this.lockAmount,this.targetLock,8,e),this.group.visible=this.opacity>.01,!this.group.visible)return;this.group.position.copy(i),this.group.quaternion.copy(n),this.group.scale.setScalar(1-this.lockAmount*.18);const r=this.dot.material;r.opacity=this.opacity*(.7+Math.sin(t*8)*.15+this.lockAmount*.2);for(const a of this.rings)a.uniforms.uTime.value=t,a.uniforms.uOpacity.value=a.spec.opacity*this.opacity,a.uniforms.uWarm.value=this.lockAmount,a.uniforms.uEnergy.value=.6+this.lockAmount*.9,a.mesh.rotation.z+=e*a.spec.spin*2.2}dispose(){for(const e of this.disposables)e.dispose()}}class dv{mesh;uniforms;geometry;material;freeSpeed=en.scanSpeedIdle;lock=0;targetLock=0;lockAngle=0;freeAngle=0;lockedInternal=!1;constructor(e=1.78){this.uniforms={uTime:{value:0},uColor:{value:new te(ve.cyan)},uWarmColor:{value:new te(ve.amber)},uWarm:{value:0},uOpacity:{value:.55},uEnergy:{value:.5},uInner:{value:e},uOuter:{value:e+.05},uFeather:{value:.012},uSegments:{value:0},uDashRatio:{value:1},uSegmentSpin:{value:0},uSweep:{value:1},uSweepSpeed:{value:en.scanSpeedIdle},uSweepWidth:{value:.22},uGapStart:{value:0},uGapSize:{value:0}},this.geometry=new Gi(e*.96,(e+.05)*1.04,160,1),this.material=new et({uniforms:this.uniforms,vertexShader:Ze.hologram.vert,fragmentShader:Ze.hologram.frag,transparent:!0,depthWrite:!1,side:Ot,blending:Qe}),this.mesh=new rt(this.geometry,this.material),this.mesh.frustumCulled=!1,this.mesh.renderOrder=10,this.mesh.name="scan-arc"}get locked(){return this.lockedInternal}update(e,t,i,n,r,a){this.targetLock=r?1:0,this.lock=Ke(this.lock,this.targetLock,7,e),this.lockedInternal=this.lock>.6;const o=en.scanSpeedIdle+(en.scanSpeedActive-en.scanSpeedIdle)*n;this.freeSpeed=Ke(this.freeSpeed,o,3,e),this.freeAngle+=e*this.freeSpeed,r&&(this.lockAngle=Math.atan2(r.y,r.x)),this.uniforms.uTime.value=t,this.uniforms.uSweepSpeed.value=this.freeSpeed*(1-this.lock),this.uniforms.uWarm.value=this.lock,this.uniforms.uEnergy.value=.4+i*.8+this.lock*.7,this.uniforms.uOpacity.value=.35+n*.3+this.lock*.3,this.uniforms.uSweepWidth.value=.22-this.lock*.13,this.mesh.quaternion.copy(a);const c=this.lock>.001?this.lockAngle:0;this.mesh.rotateZ(c*this.lock)}dispose(){this.geometry.dispose(),this.material.dispose()}}const Ic=[{id:"CORE",label:"CORE",detail:"REACTOR OUTPUT"},{id:"VISION",label:"VISION",detail:"OPTICAL INPUT"},{id:"AUDIO",label:"AUDIO",detail:"ACOUSTIC ARRAY"},{id:"SYSTEM",label:"SYSTEM",detail:"KERNEL STATUS"},{id:"DATA",label:"DATA",detail:"MEMORY LATTICE"},{id:"NETWORK",label:"NETWORK",detail:"UPLINK"}],Es=2.85,fv=2.15,pv=.42;function mv(s){const e=document.createElement("canvas");e.width=256,e.height=64;const t=e.getContext("2d");t&&(t.clearRect(0,0,e.width,e.height),t.font='600 30px "Rajdhani", "Eurostile", "Roboto Mono", monospace',t.fillStyle="#bff6ff",t.textAlign="center",t.textBaseline="middle",t.letterSpacing="4px",t.fillText(s,e.width/2,e.height/2));const i=new as(e);i.colorSpace=Vt;const n=new Yr({map:i,transparent:!0,depthWrite:!1,depthTest:!1,blending:Qe,opacity:0}),r=new el(n);return r.scale.set(.52,.13,1),{sprite:r,texture:i,material:n}}class gv{group=new Bt;nodes=[];link;linkPositions=new Float32Array(6);disposables=[];tmp=new P;hovered=null;wasPinching=!1;visibility=0;targetVisibility=0;onSelect=null;onHover=null;constructor(){this.group.name="orbital-nodes",Ic.forEach((i,n)=>{const r=Ic.length,a=n/r*Nt-Math.PI*.5,o=Math.sin(a*2)*.55+(n%2===0?.18:-.24),c=new P(Math.cos(a)*Es,o,Math.sin(a)*Es*.42),l={uTime:{value:0},uColor:{value:new te(ve.cyan)},uWarmColor:{value:new te(ve.amber)},uWarm:{value:0},uOpacity:{value:.6},uEnergy:{value:.5},uInner:{value:.075},uOuter:{value:.095},uFeather:{value:.006},uSegments:{value:8},uDashRatio:{value:.6},uSegmentSpin:{value:.25},uSweep:{value:0},uSweepSpeed:{value:0},uSweepWidth:{value:.2},uGapStart:{value:0},uGapSize:{value:0}},h=new Gi(.06,.11,64,1),p=new et({uniforms:l,vertexShader:Ze.hologram.vert,fragmentShader:Ze.hologram.frag,transparent:!0,depthWrite:!1,depthTest:!1,side:Ot,blending:Qe}),u=new rt(h,p);u.frustumCulled=!1;const{sprite:m,texture:g,material:x}=mv(i.label);m.position.set(0,-.17,0);const f=new Bt;f.position.copy(c),f.add(u),f.add(m),this.group.add(f),this.nodes.push({definition:i,group:f,ring:u,label:m,uniforms:l,basePosition:c,hover:0,selected:!1,radius:Es,phase:n*1.7}),this.disposables.push(h,p,g,x)});const e=new it;e.setAttribute("position",new Ie(this.linkPositions,3));const t=new Sn({color:ve.iceBlue,transparent:!0,opacity:0,depthWrite:!1,depthTest:!1,blending:Qe});this.link=new nl(e,t),this.link.frustumCulled=!1,this.link.renderOrder=11,this.group.add(this.link),this.disposables.push(e,t),this.group.visible=!1}setVisible(e){this.targetVisibility=e?1:0}get hoveredNode(){return this.hovered?.definition??null}get selectedNode(){return this.nodes.find(t=>t.selected)?.definition??null}update(e,t,i,n,r){if(this.visibility=Ke(this.visibility,this.targetVisibility,6,e),this.group.visible=this.visibility>.02,!this.group.visible){this.wasPinching=n;return}let a=null,o=1/0;if(i)for(const l of this.nodes){const h=l.group.position.distanceTo(i);h<pv&&h<o&&(a=l,o=h)}if(a!==this.hovered&&(this.hovered=a,this.onHover?.(a?.definition??null)),n&&!this.wasPinching&&this.hovered){for(const l of this.nodes)l.selected=l===this.hovered;this.onSelect?.(this.hovered.definition)}this.wasPinching=n;for(const l of this.nodes){const h=l===this.hovered;l.hover=Ke(l.hover,h?1:0,9,e);const p=l.selected?fv:Es;l.radius=Ke(l.radius,p,4,e);const u=l.radius/Es;this.tmp.copy(l.basePosition).multiplyScalar(u),this.tmp.y+=Math.sin(t*.6+l.phase)*.035,l.group.position.copy(this.tmp),l.group.quaternion.copy(r),l.group.scale.setScalar((1+l.hover*.45)*(.85+this.visibility*.15)),l.uniforms.uTime.value=t,l.uniforms.uOpacity.value=(.35+l.hover*.6+(l.selected?.25:0))*this.visibility,l.uniforms.uEnergy.value=.4+l.hover*1.2+(l.selected?.5:0),l.uniforms.uWarm.value=l.selected?.65:l.hover*.25,l.uniforms.uSegmentSpin.value=.25+l.hover*1.4,l.label.material.opacity=(.25+l.hover*.75)*this.visibility}const c=this.link.material;i&&this.hovered?(this.linkPositions[0]=i.x,this.linkPositions[1]=i.y,this.linkPositions[2]=i.z,this.linkPositions[3]=this.hovered.group.position.x,this.linkPositions[4]=this.hovered.group.position.y,this.linkPositions[5]=this.hovered.group.position.z,this.link.geometry.attributes.position.needsUpdate=!0,c.opacity=Ke(c.opacity,.75*this.visibility,12,e)):c.opacity=Ke(c.opacity,0,12,e)}dispose(){for(const e of this.disposables)e.dispose()}}const Fa=[{name:"MERCURY",tag:"1ST KEPLERIAN NODE",radius:.052,semiMajorAxis:1.85,eccentricity:.19,inclination:.12,argOfPeriapsis:.5,orbitalSpeed:.72,rotationSpeed:.45,axialTilt:.03,primaryColor:9479342,atmosphereColor:61695,glowColor:58879,auDistance:"0.39 AU",description:"TERRESTRIAL • 0.39 AU • SWIFT PERIHELION"},{name:"VENUS",tag:"2ND KEPLERIAN NODE",radius:.078,semiMajorAxis:2.3,eccentricity:.04,inclination:.06,argOfPeriapsis:1.35,orbitalSpeed:.54,rotationSpeed:-.28,axialTilt:3.1,primaryColor:16098851,atmosphereColor:16765567,glowColor:16755200,auDistance:"0.72 AU",description:"GREENHOUSE • 0.72 AU • DENSE IONOSPHERE"},{name:"EARTH",tag:"3RD KEPLERIAN NODE",radius:.09,semiMajorAxis:2.85,eccentricity:.06,inclination:0,argOfPeriapsis:2.05,orbitalSpeed:.44,rotationSpeed:1.35,axialTilt:.41,primaryColor:1799396,atmosphereColor:61695,glowColor:61695,auDistance:"1.00 AU",description:"BIOSPHERE • 1.00 AU • HABITABLE ZONE",hasMoon:!0},{name:"MARS",tag:"4TH KEPLERIAN NODE",radius:.065,semiMajorAxis:3.45,eccentricity:.13,inclination:.04,argOfPeriapsis:3.2,orbitalSpeed:.35,rotationSpeed:1.2,axialTilt:.44,primaryColor:15684432,atmosphereColor:16740419,glowColor:16727296,auDistance:"1.52 AU",description:"DESERT • 1.52 AU • IRON OXIDE MATRIX"},{name:"JUPITER",tag:"5TH KEPLERIAN NODE",radius:.195,semiMajorAxis:4.25,eccentricity:.07,inclination:.025,argOfPeriapsis:4.1,orbitalSpeed:.24,rotationSpeed:2.4,axialTilt:.05,primaryColor:13933418,atmosphereColor:16761996,glowColor:16754470,auDistance:"5.20 AU",description:"GAS GIANT • 5.20 AU • GREAT RED SPOT"},{name:"SATURN",tag:"6TH KEPLERIAN NODE",radius:.165,semiMajorAxis:5.15,eccentricity:.09,inclination:.045,argOfPeriapsis:5.2,orbitalSpeed:.18,rotationSpeed:2.1,axialTilt:.47,primaryColor:14663818,atmosphereColor:16769700,glowColor:16766287,auDistance:"9.58 AU",description:"RINGED GIANT • 9.58 AU • DUST DISCS",hasRings:!0},{name:"URANUS",tag:"7TH KEPLERIAN NODE",radius:.118,semiMajorAxis:5.95,eccentricity:.06,inclination:.015,argOfPeriapsis:.85,orbitalSpeed:.13,rotationSpeed:-1.5,axialTilt:1.71,primaryColor:4773595,atmosphereColor:8060927,glowColor:58879,auDistance:"19.2 AU",description:"ICE GIANT • 19.2 AU • RETROGRADE TILT"},{name:"NEPTUNE",tag:"8TH KEPLERIAN NODE",radius:.114,semiMajorAxis:6.75,eccentricity:.05,inclination:.032,argOfPeriapsis:2.6,orbitalSpeed:.1,rotationSpeed:1.6,axialTilt:.49,primaryColor:2448368,atmosphereColor:6069503,glowColor:2718207,auDistance:"30.1 AU",description:"ICE GIANT • 30.1 AU • SUPERSONIC VORTEX"},{name:"PLUTO",tag:"9TH KEPLERIAN NODE",radius:.048,semiMajorAxis:7.55,eccentricity:.24,inclination:.3,argOfPeriapsis:1.95,orbitalSpeed:.075,rotationSpeed:.45,axialTilt:2.13,primaryColor:11583173,atmosphereColor:13621468,glowColor:9479342,auDistance:"39.5 AU",description:"DWARF SYSTEM • 39.5 AU • KUIPER BELT"}];function Yn(s,e,t){const i=s.eccentricity,n=s.semiMajorAxis,r=e-s.argOfPeriapsis,a=n*(1-i*i)/(1+i*Math.cos(r)),o=a*Math.cos(e),c=a*Math.sin(e),l=Math.cos(s.inclination),h=Math.sin(s.inclination);return t.set(o,c*h,c*l),t}function vv(s){const e=document.createElement("canvas");e.width=512,e.height=256;const t=e.getContext("2d");if(!t)return new as(e);const i=s.primaryColor,n=i>>16&255,r=i>>8&255,a=i&255,o=t.createLinearGradient(0,0,0,256);if(o.addColorStop(0,`rgb(${Math.max(0,n-45)}, ${Math.max(0,r-45)}, ${Math.max(0,a-45)})`),o.addColorStop(.5,`rgb(${n}, ${r}, ${a})`),o.addColorStop(1,`rgb(${Math.max(0,n-55)}, ${Math.max(0,r-55)}, ${Math.max(0,a-55)})`),t.fillStyle=o,t.fillRect(0,0,512,256),s.name==="EARTH"){t.fillStyle="#228b44";for(let l=0;l<11;l++){const h=40+l*45+l%2*20,p=65+l%3*45;t.beginPath(),t.ellipse(h,p,34+l%3*12,24+l%2*8,l*.45,0,Math.PI*2),t.fill()}t.fillStyle="rgba(240, 252, 255, 0.95)",t.fillRect(0,0,512,20),t.fillRect(0,236,512,20),t.fillStyle="rgba(255, 255, 255, 0.65)";for(let l=0;l<18;l++)t.beginPath(),t.arc(25+l*30,55+l%4*35,16+l%3*7,0,Math.PI*2),t.fill()}else if(s.name==="JUPITER"){const l=["#e5a974","#b86d34","#f5cca3","#9c4d21","#e8af7d","#cc8044","#f0c294","#873d12","#efcaa0","#b56832","#de9f66"],h=256/l.length;for(let p=0;p<l.length;p++)t.fillStyle=l[p],t.fillRect(0,p*h,512,h+2),t.fillStyle="rgba(255, 255, 255, 0.08)",t.fillRect(0,p*h+h*.4,512,2);t.fillStyle="#ba3214",t.beginPath(),t.ellipse(330,165,42,24,-.12,0,Math.PI*2),t.fill(),t.fillStyle="#f8c796",t.beginPath(),t.ellipse(330,165,20,11,-.12,0,Math.PI*2),t.fill()}else if(s.name==="SATURN"){const l=["#e8ceaa","#daba88","#f2deb6","#cca870","#edd2a8","#d6b37d"],h=256/l.length;for(let p=0;p<l.length;p++)t.fillStyle=l[p],t.fillRect(0,p*h,512,h+2)}else if(s.name==="MARS")t.fillStyle="#a82c10",t.beginPath(),t.ellipse(150,115,80,48,.35,0,Math.PI*2),t.ellipse(375,145,65,38,-.25,0,Math.PI*2),t.fill(),t.fillStyle="#fff0eb",t.fillRect(0,0,512,16),t.fillRect(0,242,512,14);else if(s.name==="VENUS"){t.fillStyle="rgba(255, 235, 180, 0.45)";for(let l=0;l<14;l++)t.beginPath(),t.ellipse(35+l*42,38+l%5*40,68,18,-.22,0,Math.PI*2),t.fill()}else(s.name==="URANUS"||s.name==="NEPTUNE")&&(t.fillStyle="rgba(255, 255, 255, 0.22)",t.fillRect(0,80,512,8),t.fillRect(0,150,512,6),t.fillRect(0,195,512,10));const c=new as(e);return c.wrapS=Ur,c.wrapT=Ti,c}function xv(){const s=document.createElement("canvas");s.width=512,s.height=1;const e=s.getContext("2d");if(e){const t=e.createLinearGradient(0,0,512,0);t.addColorStop(0,"rgba(0, 240, 255, 0.0)"),t.addColorStop(.12,"rgba(240, 215, 165, 0.85)"),t.addColorStop(.32,"rgba(225, 190, 135, 0.95)"),t.addColorStop(.46,"rgba(0, 0, 0, 0.05)"),t.addColorStop(.52,"rgba(235, 205, 150, 0.85)"),t.addColorStop(.82,"rgba(210, 175, 120, 0.65)"),t.addColorStop(.96,"rgba(0, 240, 255, 0.2)"),t.addColorStop(1,"rgba(0, 240, 255, 0.0)"),e.fillStyle=t,e.fillRect(0,0,512,1)}return new as(s)}function _v(s,e){const t=document.createElement("canvas");t.width=280,t.height=70;const i=t.getContext("2d");i&&(i.clearRect(0,0,280,70),i.fillStyle="rgba(2, 9, 24, 0.88)",i.strokeStyle="#00f0ff",i.lineWidth=1.5,i.beginPath(),i.roundRect(8,8,264,54,8),i.stroke(),i.fill(),i.font='bold 15px "Orbitron", monospace',i.fillStyle="#00f0ff",i.textAlign="left",i.fillText("◈",22,38),i.font='bold 18px "Orbitron", sans-serif',i.fillStyle="#ffffff",i.fillText(s,45,38),i.font='bold 12px "Share Tech Mono", monospace',i.fillStyle="#00f0ff",i.textAlign="right",i.fillText(e,256,38));const n=new as(t);n.colorSpace=Vt;const r=new Yr({map:n,transparent:!0,depthWrite:!1,blending:Qe,opacity:.92}),a=new el(r);return a.scale.set(.72,.18,1),a}class Sv{group=new Bt;planets=[];visible=!0;pulseEnergy=0;timeScale=1;constructor(){this.group.name="PlanetarySystem",this.buildSystem()}buildSystem(){const e=new Bi(1,36,28),t=xv();for(let i=0;i<Fa.length;i++){const n=Fa[i],r=new Bt;r.name=`Orbit_${n.name}`;const a=(i*(Nt/Fa.length)*1.618+n.argOfPeriapsis)%Nt,o=144,c=[],l=new P;for(let be=0;be<=o;be++){const He=be/o*Nt;c.push(Yn(n,He,new P))}const h=new it().setFromPoints(c),p=new Sn({color:n.glowColor,transparent:!0,opacity:.35,blending:Qe,linewidth:1.5}),u=new ur(h,p);r.add(u);const m=new Sn({color:n.atmosphereColor,transparent:!0,opacity:.14,blending:Qe}),g=new ur(h,m);g.scale.setScalar(1.006),r.add(g);const x=3,f=new it,d=new Float32Array(x*3),T=[];for(let be=0;be<x;be++){const He=(a+be*Nt/x)%Nt;T.push(He),Yn(n,He,l),d[be*3]=l.x,d[be*3+1]=l.y,d[be*3+2]=l.z}f.setAttribute("position",new Ie(d,3));const E=new hh({color:n.glowColor,size:.08,transparent:!0,opacity:.85,blending:Qe}),S=new hs(f,E);r.add(S);const M=new Bt;Yn(n,a,l),M.position.copy(l),M.rotation.z=n.axialTilt;const b=vv(n),R=new jl({map:b,roughness:.55,metalness:.2,emissive:new te(n.primaryColor),emissiveIntensity:.28}),_=new rt(e,R);_.scale.setScalar(n.radius),M.add(_);const w=new Bi(n.radius*1.22,24,20),L=new Vi({color:n.atmosphereColor,transparent:!0,opacity:.32,blending:Qe,side:$t}),C=new rt(w,L);M.add(C);const I=[],H=32,X=n.radius*1.55;for(let be=0;be<=H;be++){const He=be/H*Nt;I.push(new P(Math.cos(He)*X,0,Math.sin(He)*X))}const F=new it().setFromPoints(I),W=new Sn({color:n.glowColor,transparent:!0,opacity:.45,blending:Qe}),G=new ur(F,W);M.add(G);let $;if(n.hasRings){const be=new Gi(n.radius*1.5,n.radius*2.8,64),He=new Vi({map:t,side:Ot,transparent:!0,opacity:.9,blending:Qe});$=new rt(be,He),$.rotation.x=Math.PI/2,M.add($)}let Q,ie,se;if(n.hasMoon){Q=new Bt;const be=n.radius*2.5,He=[];for(let Ce=0;Ce<=32;Ce++){const Ne=Ce/32*Nt;He.push(new P(Math.cos(Ne)*be,0,Math.sin(Ne)*be))}const Ye=new it().setFromPoints(He),K=new Sn({color:61695,transparent:!0,opacity:.25});se=new ur(Ye,K),M.add(se);const re=new Bi(n.radius*.28,18,14),ee=new jl({color:13421772,emissive:2245734,emissiveIntensity:.3,roughness:.7});ie=new rt(re,ee),ie.position.set(be,0,0),Q.add(ie),M.add(Q)}const ge=_v(n.name,n.auDistance);ge.position.set(0,n.radius+.22,0),M.add(ge),r.add(M),this.group.add(r),this.planets.push({config:n,orbitGroup:r,bodyPivot:M,planetMesh:_,glowMesh:C,hudRingMesh:G,labelSprite:ge,orbitLinePrimary:u,orbitLineGlow:g,energyPulseMesh:S,currentAngle:a,pulseAngles:T,ringsMesh:$,moonPivot:Q,moonMesh:ie,moonTrack:se})}}setVisible(e){this.visible=e,this.group.visible=e}toggleVisible(){return this.setVisible(!this.visible),this.visible}get isVisible(){return this.visible}triggerPulse(){this.pulseEnergy=1}setTimeScale(e){this.timeScale=Math.max(0,Math.min(10,e))}update(e,t){if(!this.visible)return;this.pulseEnergy>0&&(this.pulseEnergy=Math.max(0,this.pulseEnergy-e*1.5));const i=(1+t*.6+this.pulseEnergy*1.2)*this.timeScale,n=new P;for(let r=0;r<this.planets.length;r++){const a=this.planets[r],o=a.config;Yn(o,a.currentAngle,n);const c=n.length(),l=Math.pow(o.semiMajorAxis/Math.max(.1,c),1.5),h=o.orbitalSpeed*i*l*e*.32;a.currentAngle=(a.currentAngle+h)%Nt,Yn(o,a.currentAngle,n),a.bodyPivot.position.copy(n),a.planetMesh.rotation.y+=o.rotationSpeed*this.timeScale*e*.8,a.hudRingMesh.rotation.y+=.8*e;const p=a.energyPulseMesh.geometry.getAttribute("position"),u=p.array;for(let f=0;f<a.pulseAngles.length;f++)a.pulseAngles[f]=(a.pulseAngles[f]+o.orbitalSpeed*i*e*.65)%Nt,Yn(o,a.pulseAngles[f],n),u[f*3]=n.x,u[f*3+1]=n.y,u[f*3+2]=n.z;p.needsUpdate=!0,a.moonPivot&&(a.moonPivot.rotation.y+=2.5*e);const m=a.orbitLinePrimary.material;m.opacity=.3+t*.25+this.pulseEnergy*.45;const g=a.orbitLineGlow.material;g.opacity=.12+t*.18+this.pulseEnergy*.3;const x=a.glowMesh.material;x.opacity=.32+t*.25+this.pulseEnergy*.5}}dispose(){for(const e of this.planets)e.orbitLinePrimary.geometry.dispose(),e.orbitLinePrimary.material.dispose(),e.orbitLineGlow.geometry.dispose(),e.orbitLineGlow.material.dispose(),e.energyPulseMesh.geometry.dispose(),e.energyPulseMesh.material.dispose(),e.hudRingMesh.geometry.dispose(),e.hudRingMesh.material.dispose(),e.planetMesh.geometry.dispose(),e.planetMesh.material.dispose(),e.glowMesh.geometry.dispose(),e.glowMesh.material.dispose(),e.labelSprite.geometry.dispose(),e.labelSprite.material.dispose(),e.ringsMesh&&(e.ringsMesh.geometry.dispose(),e.ringsMesh.material.dispose()),e.moonMesh&&(e.moonMesh.geometry.dispose(),e.moonMesh.material.dispose()),e.moonTrack&&(e.moonTrack.geometry.dispose(),e.moonTrack.material.dispose());this.planets.length=0}}const $n={WRIST:0,THUMB_TIP:4,INDEX_MCP:5,INDEX_TIP:8,MIDDLE_MCP:9,PINKY_MCP:17},hi=21,Bo=[[0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[0,9],[9,10],[10,11],[11,12],[0,13],[13,14],[14,15],[15,16],[0,17],[17,18],[18,19],[19,20],[5,9],[9,13],[13,17]],Sr=[{name:"thumb",mcp:2,pip:3,tip:4},{name:"index",mcp:5,pip:6,tip:8},{name:"middle",mcp:9,pip:10,tip:12},{name:"ring",mcp:13,pip:14,tip:16},{name:"pinky",mcp:17,pip:18,tip:20}],yv={OFF:"CAMERA OFF",INITIALIZING:"CAMERA INITIALIZING",READY:"CAMERA READY",TRACKING:"TRACKING",NO_HAND:"NO HAND DETECTED",TRACKING_LOST:"TRACKING LOST",DENIED:"CAMERA ACCESS REQUIRED",ERROR:"VISION SUBSYSTEM ERROR"};class Mv{group=new Bt;joints;bones;bonePositions;dummy=new Pt;disposables=[];maxHands;constructor(e=2){this.maxHands=e,this.group.name="hand-skeleton",this.group.visible=!1;const t=new Bi(.028,10,8),i=new Vi({color:ve.iceBlue,transparent:!0,opacity:.9,blending:Qe,depthWrite:!1,depthTest:!1});this.joints=new Yu(t,i,hi*e),this.joints.frustumCulled=!1,this.joints.instanceMatrix.setUsage(Su),this.joints.count=0,this.group.add(this.joints),this.disposables.push(t,i),this.bonePositions=new Float32Array(Bo.length*2*3*e);const n=new it;n.setAttribute("position",new Ie(this.bonePositions,3));const r=new Sn({color:ve.cyan,transparent:!0,opacity:.65,blending:Qe,depthWrite:!1,depthTest:!1});this.bones=new ch(n,r),this.bones.frustumCulled=!1,this.group.add(this.bones),this.disposables.push(n,r)}setVisible(e){this.group.visible=e}get visible(){return this.group.visible}update(e){if(!this.group.visible)return;let t=0,i=0;for(let n=0;n<this.maxHands;n++){const r=e[n];if(!(!r||r.length<hi)){for(let a=0;a<hi;a++){this.dummy.position.copy(r[a]);const o=a===4||a===8||a===12||a===16||a===20;this.dummy.scale.setScalar(o?1.5:1),this.dummy.updateMatrix(),this.joints.setMatrixAt(t++,this.dummy.matrix)}for(const[a,o]of Bo){const c=r[a],l=r[o];this.bonePositions[i++]=c.x,this.bonePositions[i++]=c.y,this.bonePositions[i++]=c.z,this.bonePositions[i++]=l.x,this.bonePositions[i++]=l.y,this.bonePositions[i++]=l.z}}}this.joints.count=t,this.joints.instanceMatrix.needsUpdate=!0;for(let n=i;n<this.bonePositions.length;n++)this.bonePositions[n]=0;this.bones.geometry.setDrawRange(0,i/3),this.bones.geometry.attributes.position.needsUpdate=!0}dispose(){for(const e of this.disposables)e.dispose()}}const bv=.13;class Ev{constructor(e,t,i){this.orb=e,this.rig=t,this.effects=i;for(let n=0;n<2;n++)for(let r=0;r<hi;r++)this.skeletonPoints[n].push(new P)}worldPositions=[new P,new P];tipPositions=[new P,new P];pinchPositions=[new P,new P];previousPinch=[new P,new P];initialised=[!1,!1];pinchWasActive=[!1,!1];skeletonPoints=[[],[]];skeletonView=[null,null];origin=new P(0,0,0);tmp=new P;energyTarget=.22;readout={handCount:0,handToOrb:0,separation:0,energy:.22,scale:1,cursorActive:!1,locked:!1};mapHandToWorld(e,t,i,n){const r=1-e-.5,a=.5-t,o=Zt.DEPTH_OFFSET+(i-bv)*Zt.DEPTH_SCALE;return n.set(r*Zt.WORLD_WIDTH,a*Zt.WORLD_HEIGHT,Oi(o,-1.2,2.6)),n}update(e,t,i,n,r){let a=0,o=null,c=null,l=null,h=!1;for(let x=0;x<2;x++){const f=i[x],d=this.effects.beams[x],T=this.effects.trails[x];if(!f||!f.active||f.confidence<Tt.confidenceThreshold){this.orb.setHand(x,null),d.setActive(!1),this.initialised[x]=!1,this.pinchWasActive[x]=!1,this.skeletonView[x]=null;continue}a++,(!o||f.confidence>o.confidence)&&(o=f);const E=this.worldPositions[x];this.mapHandToWorld(f.palm.x,f.palm.y,f.handScale,this.tmp),this.initialised[x]?(E.x=Ke(E.x,this.tmp.x,Zt.SMOOTHING_FACTOR,e),E.y=Ke(E.y,this.tmp.y,Zt.SMOOTHING_FACTOR,e),E.z=Ke(E.z,this.tmp.z,Zt.SMOOTHING_FACTOR,e)):(E.copy(this.tmp),this.initialised[x]=!0);const S=this.tipPositions[x];this.mapHandToWorld(f.indexTip.x,f.indexTip.y,f.handScale,this.tmp),S.x=Ke(S.x,this.tmp.x,Zt.SMOOTHING_FACTOR*1.3,e),S.y=Ke(S.y,this.tmp.y,Zt.SMOOTHING_FACTOR*1.3,e),S.z=Ke(S.z,this.tmp.z,Zt.SMOOTHING_FACTOR*1.3,e);const M=this.pinchPositions[x];this.mapHandToWorld(f.pinchPoint.x,f.pinchPoint.y,f.handScale,this.tmp),M.x=Ke(M.x,this.tmp.x,Zt.SMOOTHING_FACTOR*1.2,e),M.y=Ke(M.y,this.tmp.y,Zt.SMOOTHING_FACTOR*1.2,e),M.z=Ke(M.z,this.tmp.z,Zt.SMOOTHING_FACTOR*1.2,e);const b=E.length(),R=Rt(Qn(b,We.radius*2.6,We.radius*.6,0,1)),_=f.confidence*(.35+R*.65);if(this.orb.setHand(x,E,_),f.pinching){if(this.pinchWasActive[x]){const L=jr(M.x-this.previousPinch[x].x,Tt.motionDeadZone),C=jr(M.y-this.previousPinch[x].y,Tt.motionDeadZone);this.orb.applyRotation(L*We.pinchRotationGain,-C*We.pinchRotationGain)}this.previousPinch[x].copy(M),this.pinchWasActive[x]=!0,d.setEndpoints(M,this.origin),d.setActive(!0),c=M}else this.pinchWasActive[x]=!1,d.setActive(!1);const w=f.speed*Zt.WORLD_WIDTH*.5;if(T.emit(E,w,f.pinching?1:0,t),(f.gesture==="POINT"||f.gesture==="PINCH")&&(!l||f===o)&&(l=S,h=f.pinching),this.effects.skeleton.visible&&f.landmarks&&f.landmarks.length>=hi){const L=this.skeletonPoints[x];for(let C=0;C<hi;C++){const I=f.landmarks[C];this.mapHandToWorld(I.x,I.y,f.handScale,L[C]),L[C].z+=-I.z*2.4}this.skeletonView[x]=L}else this.skeletonView[x]=null}const p=i[0],u=i[1];let m=0;if(a>=2&&p&&u&&p.confidence>=Tt.confidenceThreshold&&u.confidence>=Tt.confidenceThreshold){m=Math.hypot(p.palm.x-u.palm.x,p.palm.y-u.palm.y);const x=Qn(m,Tt.twoHandMinSeparation,Tt.twoHandMaxSeparation,We.minScale,We.maxScale);this.orb.setScaleTarget(x);const f=p.label==="Left"?p:u,d=f===p?u:p;this.orb.applyRotation(jr(f.velocity.x,.05)*-.55,0),this.energyTarget=Rt(.45+(1-d.palm.y)*.55)}else this.energyTarget=this.energyForGesture(n,a);if(this.orb.setEnergyTarget(this.energyTarget),o){const x=(1-o.palm.x)*2-1,f=1-o.palm.y*2;this.rig.setParallax(x*.5,f*.4)}else this.rig.setParallax(0,0);const g=Rt(a>0?1:0);this.effects.reticle.setActive(l!==null),this.effects.reticle.setLocked(this.effects.nodes.hoveredNode!==null||h),this.effects.reticle.update(e,t,l??this.origin,r),this.effects.scanArc.update(e,t,this.orb.activation,g,c,r),this.effects.nodes.update(e,t,l,h,r),this.effects.skeleton.update(this.skeletonView);for(let x=0;x<2;x++)this.effects.beams[x].update(e,t),this.effects.trails[x].update(t);return this.readout.handCount=a,this.readout.handToOrb=o?Math.max(0,this.worldPositions[o.slot].length()-We.radius*this.orb.currentScale):0,this.readout.separation=m,this.readout.energy=this.orb.activation,this.readout.scale=this.orb.currentScale,this.readout.cursorActive=l!==null,this.readout.locked=this.effects.scanArc.locked,this.readout}energyForGesture(e,t){if(t===0)return .22;switch(e){case"OPEN_PALM":return .98;case"FIST":return .88;case"PINCHING":return .72;case"POINTING":return .6;case"TWO_HAND":return .8;default:return .5}}worldPosition(e){return this.worldPositions[e]}reset(){for(let e=0;e<2;e++)this.initialised[e]=!1,this.pinchWasActive[e]=!1,this.effects.beams[e].setActive(!1),this.effects.trails[e].clear(),this.orb.setHand(e,null)}}class Ch{listeners=new Map;on(e,t){let i=this.listeners.get(e);return i||(i=new Set,this.listeners.set(e,i)),i.add(t),()=>i.delete(t)}emit(e,t){const i=this.listeners.get(e);if(i)for(const n of i)n(t)}clear(){this.listeners.clear()}}const Tv={IDLE:"STANDBY",HAND_DETECTED:"HAND DETECTED",POINTING:"TARGET ACQUIRED",PINCHING:"PINCH DETECTED",OPEN_PALM:"SYSTEM ACTIVE",FIST:"POWER SURGE",TWO_HAND:"DUAL CONTROL",SWIPE:"MODE SHIFT"};class wv{events=new Ch;debouncer=new Hh("IDLE",Tt.debounceSeconds);accepted="IDLE";pinchLatched=[!1,!1];fistLatched=[!1,!1];swipes=[{startX:0,startTime:0,tracking:!1,cooldown:0,lastX:0,hasLast:!1},{startX:0,startTime:0,tracking:!1,cooldown:0,lastX:0,hasLast:!1}];elapsed=0;primarySlot=0;get state(){return this.accepted}get primary(){return this.primarySlot}update(e,t){this.elapsed+=t;const i=e.filter(o=>o.active&&o.confidence>=Tt.confidenceThreshold);let n=null;for(const o of i)(!n||o.confidence>n.confidence)&&(n=o);this.primarySlot=n?n.slot:0;const r=this.classify(i,n),a=this.accepted;return this.accepted=this.debouncer.update(r,t),this.accepted!==a&&this.events.emit("change",{from:a,to:this.accepted}),this.trackDiscreteEvents(e,t),this.accepted}classify(e,t){if(e.length===0)return"IDLE";if(e.length>=2)return"TWO_HAND";if(!t)return"HAND_DETECTED";switch(t.gesture){case"PINCH":return"PINCHING";case"FIST":return"FIST";case"POINT":return"POINTING";case"OPEN_PALM":return"OPEN_PALM";default:return"HAND_DETECTED"}}trackDiscreteEvents(e,t){for(const i of e){const n=i.slot,r=this.swipes[n];if(r.cooldown=Math.max(0,r.cooldown-t),!i.active||i.confidence<Tt.confidenceThreshold){this.pinchLatched[n]&&(this.pinchLatched[n]=!1,this.events.emit("pinchEnd",{slot:n})),this.fistLatched[n]&&(this.fistLatched[n]=!1,this.events.emit("fistRelease",{slot:n})),r.tracking=!1,r.hasLast=!1;continue}const a=i;a.pinching&&!this.pinchLatched[n]?(this.pinchLatched[n]=!0,this.events.emit("pinchStart",{slot:n})):!a.pinching&&this.pinchLatched[n]&&(this.pinchLatched[n]=!1,this.events.emit("pinchEnd",{slot:n}));const o=a.gesture==="FIST";o&&!this.fistLatched[n]?(this.fistLatched[n]=!0,this.events.emit("fistStart",{slot:n})):!o&&this.fistLatched[n]&&(this.fistLatched[n]=!1,this.events.emit("fistRelease",{slot:n}));const c=a.extendedCount>=3&&!a.pinching,l=Math.abs(a.velocity.x);if(!c){r.tracking=!1,r.lastX=a.palm.x,r.hasLast=!0;continue}if(!r.tracking&&l>Tt.swipeMinVelocity)r.tracking=!0,r.startX=r.hasLast?r.lastX:a.palm.x,r.startTime=this.elapsed;else if(r.tracking){const h=a.palm.x-r.startX;if(this.elapsed-r.startTime>Tt.swipeMaxDuration||l<Tt.swipeMinVelocity*.35)r.tracking=!1;else if(Math.abs(h)>=Tt.swipeMinDistance&&r.cooldown<=0){const u=h>0?1:-1;r.tracking=!1,r.cooldown=Tt.swipeCooldown,this.events.emit("swipe",{direction:u,slot:n})}}r.lastX=a.palm.x,r.hasLast=!0}}reset(){this.debouncer.force("IDLE"),this.accepted="IDLE",this.pinchLatched=[!1,!1],this.fistLatched=[!1,!1];for(const e of this.swipes)e.tracking=!1,e.cooldown=0,e.hasLast=!1}}function ko(s){return{slot:s,active:!1,label:"Unknown",gesture:"NONE",confidence:0,pinching:!1,pinchDistance:1,palm:{x:.5,y:.5,z:0},indexTip:{x:.5,y:.5,z:0},pinchPoint:{x:.5,y:.5,z:0},velocity:{x:0,y:0},speed:0,handScale:.16,extendedCount:0,extension:[0,0,0,0,0],palmOpenness:0,palmRoll:0,palmNormal:{x:0,y:0,z:1},landmarks:null}}class Av{constructor(e){this.element=e}hand=ko(0);velocityX=new Ps(9);velocityY=new Ps(9);previous=null;zoomDelta=0;dragDeltaX=0;dragDeltaY=0;enabled=!1;pointerInside=!1;detach=[];attach(){let e=!1,t=0,i=0,n=!1,r=0,a=0;const o=x=>{this.pointerInside=!0;const f=this.element.getBoundingClientRect();if(this.hand.palm.x=(x.clientX-f.left)/Math.max(1,f.width),this.hand.palm.y=(x.clientY-f.top)/Math.max(1,f.height),this.hand.palm.z=0,e){const d=x.clientX-t,T=x.clientY-i;this.dragDeltaX+=d,this.dragDeltaY+=T,t=x.clientX,i=x.clientY}},c=x=>{e=!0,t=x.clientX,i=x.clientY,x.button===0&&(this.hand.pinching=!0)},l=()=>{e=!1,this.hand.pinching=!1},h=()=>{this.pointerInside=!1,this.hand.pinching=!1,e=!1},p=x=>{x.preventDefault(),this.zoomDelta+=-x.deltaY*.0012},u=x=>{const f=x.touches[0];f&&(n=!0,r=f.clientX,a=f.clientY)},m=x=>{const f=x.touches[0];if(!f)return;const d=this.element.getBoundingClientRect();this.pointerInside=!0,this.hand.pinching=x.touches.length>=1,this.hand.palm.x=(f.clientX-d.left)/Math.max(1,d.width),this.hand.palm.y=(f.clientY-d.top)/Math.max(1,d.height),n&&(this.dragDeltaX+=f.clientX-r,this.dragDeltaY+=f.clientY-a,r=f.clientX,a=f.clientY)},g=()=>{this.hand.pinching=!1,n=!1};this.element.addEventListener("pointermove",o),this.element.addEventListener("pointerdown",c),window.addEventListener("pointerup",l),this.element.addEventListener("pointerleave",h),this.element.addEventListener("wheel",p,{passive:!1}),this.element.addEventListener("touchstart",u,{passive:!0}),this.element.addEventListener("touchmove",m,{passive:!0}),this.element.addEventListener("touchend",g),this.detach=[()=>this.element.removeEventListener("pointermove",o),()=>this.element.removeEventListener("pointerdown",c),()=>window.removeEventListener("pointerup",l),()=>this.element.removeEventListener("pointerleave",h),()=>this.element.removeEventListener("wheel",p),()=>this.element.removeEventListener("touchstart",u),()=>this.element.removeEventListener("touchmove",m),()=>this.element.removeEventListener("touchend",g)]}setEnabled(e){this.enabled=e,e||(this.hand.active=!1,this.hand.pinching=!1,this.previous=null)}get isEnabled(){return this.enabled}consumeZoom(){const e=this.zoomDelta;return this.zoomDelta=0,e}consumeDrag(){const e=this.dragDeltaX,t=this.dragDeltaY;return this.dragDeltaX=0,this.dragDeltaY=0,{x:e,y:t}}update(e){const t=this.hand;return t.active=this.enabled&&this.pointerInside,t.confidence=t.active?1:0,t.label="Right",t.handScale=.16,this.previous&&e>0?(t.velocity.x=this.velocityX.update((t.palm.x-this.previous.x)/e,e),t.velocity.y=this.velocityY.update((t.palm.y-this.previous.y)/e,e)):(t.velocity.x=0,t.velocity.y=0),t.speed=Math.hypot(t.velocity.x,t.velocity.y),this.previous={x:t.palm.x,y:t.palm.y},t.indexTip.x=t.palm.x,t.indexTip.y=t.palm.y,t.indexTip.z=t.palm.z,t.pinchPoint.x=t.palm.x,t.pinchPoint.y=t.palm.y,t.pinchPoint.z=t.palm.z,t.pinchDistance=t.pinching?.15:.8,t.extendedCount=t.pinching?2:5,t.gesture=t.active?t.pinching?"PINCH":"POINT":"NONE",t}dispose(){for(const e of this.detach)e();this.detach=[]}}class Rv{hands=[ko(0),ko(1)];fromTracked(e){for(let t=0;t<2;t++){const i=this.hands[t],n=e[t];if(!n||!n.active){i.active=!1,i.confidence=0,i.gesture="NONE",i.pinching=!1,i.landmarks=null;continue}const r=n.features;i.active=!0,i.label=n.label,i.gesture=r.gesture,i.confidence=r.confidence,i.pinching=r.pinching,i.pinchDistance=r.pinchDistance,i.palm.x=r.position.x,i.palm.y=r.position.y,i.palm.z=r.position.z,i.indexTip.x=r.indexTip.x,i.indexTip.y=r.indexTip.y,i.indexTip.z=r.indexTip.z,i.pinchPoint.x=r.pinchPoint.x,i.pinchPoint.y=r.pinchPoint.y,i.pinchPoint.z=r.pinchPoint.z,i.velocity.x=r.velocity.x,i.velocity.y=r.velocity.y,i.speed=r.speed,i.handScale=r.handScale,i.extendedCount=r.extendedCount,i.extension=r.extension,i.palmOpenness=r.palmOpenness,i.palmRoll=r.palmRoll,i.palmNormal.x=r.palmNormal.x,i.palmNormal.y=r.palmNormal.y,i.palmNormal.z=r.palmNormal.z,i.landmarks=r.landmarks.length>0?r.landmarks:null}return this.hands}fromPointer(e){const t=this.hands[0];return t.active=e.active,t.label=e.label,t.gesture=e.gesture,t.confidence=e.confidence,t.pinching=e.pinching,t.pinchDistance=e.pinchDistance,t.palm.x=e.palm.x,t.palm.y=e.palm.y,t.palm.z=e.palm.z,t.indexTip.x=e.indexTip.x,t.indexTip.y=e.indexTip.y,t.indexTip.z=e.indexTip.z,t.pinchPoint.x=e.pinchPoint.x,t.pinchPoint.y=e.pinchPoint.y,t.pinchPoint.z=e.pinchPoint.z,t.velocity.x=e.velocity.x,t.velocity.y=e.velocity.y,t.speed=e.speed,t.handScale=e.handScale,t.extendedCount=e.extendedCount,t.landmarks=null,this.hands[1].active=!1,this.hands[1].confidence=0,this.hands[1].gesture="NONE",this.hands[1].pinching=!1,this.hands[1].landmarks=null,this.hands}get current(){return this.hands}}class ll{video;stream=null;starting=null;constructor(){this.video=document.createElement("video"),this.video.autoplay=!0,this.video.muted=!0,this.video.playsInline=!0,this.video.setAttribute("playsinline",""),this.video.width=Ct.video.width,this.video.height=Ct.video.height}get active(){return this.stream!==null}get ready(){return this.video.readyState>=2&&this.video.videoWidth>0}get resolution(){return{width:this.video.videoWidth,height:this.video.videoHeight}}async start(){if(!this.stream)return this.starting?this.starting:(this.starting=this.startInternal().finally(()=>{this.starting=null}),this.starting)}async startInternal(){if(!navigator.mediaDevices?.getUserMedia){const e=!window.isSecureContext;throw{kind:e?"insecure":"unsupported",message:e?"Camera access requires a secure context (https:// or localhost).":"This browser does not expose a camera API."}}try{this.stream=await navigator.mediaDevices.getUserMedia({video:{width:{ideal:Ct.video.width},height:{ideal:Ct.video.height},frameRate:{ideal:Ct.video.frameRate},facingMode:"user"},audio:!1})}catch(e){throw ll.describe(e)}this.video.srcObject=this.stream,await new Promise((e,t)=>{const i=window.setTimeout(()=>{t({kind:"unknown",message:"Camera stream timed out."})},1e4),n=()=>{window.clearTimeout(i),this.video.removeEventListener("loadeddata",n),e()};this.video.addEventListener("loadeddata",n)});try{await this.video.play()}catch{}}stop(){this.stream?.getTracks().forEach(e=>e.stop()),this.stream=null,this.video.srcObject=null}static describe(e){switch(e?.name??""){case"NotAllowedError":case"SecurityError":return{kind:"denied",message:"Camera permission was denied."};case"NotFoundError":case"OverconstrainedError":return{kind:"not-found",message:"No compatible camera was found."};case"NotReadableError":case"AbortError":return{kind:"in-use",message:"The camera is in use by another application."};default:return{kind:"unknown",message:e instanceof Error?e.message:"Camera initialisation failed."}}}}const yr={NONE:"—",NEUTRAL:"TRACKING",POINT:"POINT",PINCH:"PINCH",FIST:"FIST",OPEN_PALM:"OPEN PALM",TWO_FINGER:"NAVIGATION",THREE_FINGER:"SYSTEM ANALYSIS",FOUR_FINGER:"DATA VISUALISATION"},Cv=.4,Pv=.62,Lv=1.45;function Mr(s,e,t){t[0]=s.x-e.x,t[1]=s.y-e.y,t[2]=s.z-e.z}function Ts(s){const e=Math.hypot(s[0],s[1],s[2]);return e<1e-6?0:(s[0]/=e,s[1]/=e,s[2]/=e,e)}function Ba(s,e){return Math.hypot(s.x-e.x,s.y-e.y,s.z-e.z)}class Dc{pinchLatch=new Sl(Tt.pinchEnter,Tt.pinchExit);extensionLatches=Sr.map(()=>new Sl(1-Tt.fingerExtendEnter,1-Tt.fingerExtendExit));confidenceFilter=new Ps(6);velocityX=new Ps(10);velocityY=new Ps(10);previous=null;vecA=[0,0,0];vecB=[0,0,0];vecC=[0,0,0];features={handedness:"Unknown",score:0,confidence:0,extension:[0,0,0,0,0],extended:[!1,!1,!1,!1,!1],extendedCount:0,palmOpenness:0,pinchDistance:1,pinching:!1,position:{x:0,y:0,z:0},indexTip:{x:0,y:0,z:0},pinchPoint:{x:0,y:0,z:0},velocity:{x:0,y:0},speed:0,palmNormal:{x:0,y:0,z:0},palmRoll:0,handScale:.2,gesture:"NONE",landmarks:[]};update(e,t,i,n,r,a){const o=this.features;o.handedness=i,o.score=n,o.landmarks=e;const c=e[$n.WRIST],l=e[$n.MIDDLE_MCP],h=e[$n.INDEX_MCP],p=e[$n.PINKY_MCP],u=e[$n.THUMB_TIP],m=e[$n.INDEX_TIP],g=Math.max(.001,Ba(c,l));o.handScale=g;const x=t.length>=21?t:e;let f=0,d=0;for(let M=0;M<Sr.length;M++){const b=Sr[M];Mr(x[b.pip],x[b.mcp],this.vecA),Mr(x[b.tip],x[b.pip],this.vecB),Ts(this.vecA),Ts(this.vecB);const R=this.vecA[0]*this.vecB[0]+this.vecA[1]*this.vecB[1]+this.vecA[2]*this.vecB[2];let _=Rt((R+1)*.5);if(M===0){const L=Ba(u,l)/g,C=Rt(Qn(L,Pv,Lv,0,1));_=_*.35+C*.65}o.extension[M]=_;const w=this.extensionLatches[M].update(1-_);o.extended[M]=w,w&&d++,f+=_}o.extendedCount=d,o.palmOpenness=f/Sr.length,o.pinchDistance=Ba(u,m)/g;const T=o.extension[1]>Cv;if(o.pinching=this.pinchLatch.update(T?o.pinchDistance:1),o.position.x=(c.x+h.x+l.x+p.x)*.25,o.position.y=(c.y+h.y+l.y+p.y)*.25,o.position.z=(c.z+h.z+l.z+p.z)*.25,o.indexTip.x=m.x,o.indexTip.y=m.y,o.indexTip.z=m.z,o.pinchPoint.x=(u.x+m.x)*.5,o.pinchPoint.y=(u.y+m.y)*.5,o.pinchPoint.z=(u.z+m.z)*.5,this.previous&&r>0){const M=(o.position.x-this.previous.x)/r,b=(o.position.y-this.previous.y)/r;o.velocity.x=this.velocityX.update(M,r),o.velocity.y=this.velocityY.update(b,r)}else o.velocity.x=0,o.velocity.y=0;o.speed=Math.hypot(o.velocity.x,o.velocity.y),this.previous={x:o.position.x,y:o.position.y,time:a},Mr(h,c,this.vecA),Mr(p,c,this.vecB),Ts(this.vecA),Ts(this.vecB),this.vecC[0]=this.vecA[1]*this.vecB[2]-this.vecA[2]*this.vecB[1],this.vecC[1]=this.vecA[2]*this.vecB[0]-this.vecA[0]*this.vecB[2],this.vecC[2]=this.vecA[0]*this.vecB[1]-this.vecA[1]*this.vecB[0],Ts(this.vecC),o.palmNormal.x=this.vecC[0],o.palmNormal.y=this.vecC[1],o.palmNormal.z=this.vecC[2],o.palmRoll=Math.atan2(l.y-c.y,l.x-c.x);const E=Rt(Qn(Math.min(o.position.x,1-o.position.x),0,.08,0,1))*Rt(Qn(Math.min(o.position.y,1-o.position.y),0,.08,0,1)),S=Rt(Qn(g,.045,.11,0,1));return o.confidence=this.confidenceFilter.update(n*E*S,r),o.gesture=this.classify(o),o}classify(e){const t=e.extended[1],i=e.extended[2],n=e.extended[3],r=e.extended[4],a=(t?1:0)+(i?1:0)+(n?1:0)+(r?1:0);return a===0&&e.palmOpenness<Tt.fistMaxOpenness?"FIST":e.pinching?"PINCH":a===1&&t?"POINT":a===4&&(e.extended[0]||e.palmOpenness>Tt.openPalmMinOpenness)?"OPEN_PALM":a===2&&t&&i?"TWO_FINGER":a===3&&t&&i&&n?"THREE_FINGER":a===4?"FOUR_FINGER":"NEUTRAL"}reset(){this.pinchLatch.reset();for(const e of this.extensionLatches)e.reset();this.confidenceFilter.reset(),this.velocityX.reset(),this.velocityY.reset(),this.previous=null,this.features.gesture="NONE"}get current(){return this.features}}class Nc{filters=[];output=[];constructor(e=Qr.minCutoff,t=Qr.beta,i=Qr.derivativeCutoff){for(let n=0;n<hi*3;n++)this.filters.push(new Nr(e,t,i));for(let n=0;n<hi;n++)this.output.push({x:0,y:0,z:0})}filter(e,t){const i=Math.min(e.length,hi);for(let n=0;n<i;n++){const r=e[n],a=this.output[n];a.x=this.filters[n*3].filter(r.x,t),a.y=this.filters[n*3+1].filter(r.y,t),a.z=this.filters[n*3+2].filter(r.z,t)}return this.output}reset(){for(const e of this.filters)e.reset()}}const Iv="modulepreload",Dv=function(s,e){return new URL(s,e).href},Uc={},Nv=function(e,t,i){let n=Promise.resolve();if(t&&t.length>0){const a=document.getElementsByTagName("link"),o=document.querySelector("meta[property=csp-nonce]"),c=o?.nonce||o?.getAttribute("nonce");n=Promise.allSettled(t.map(l=>{if(l=Dv(l,i),l in Uc)return;Uc[l]=!0;const h=l.endsWith(".css"),p=h?'[rel="stylesheet"]':"";if(!!i)for(let g=a.length-1;g>=0;g--){const x=a[g];if(x.href===l&&(!h||x.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${l}"]${p}`))return;const m=document.createElement("link");if(m.rel=h?"stylesheet":Iv,h||(m.as="script"),m.crossOrigin="",m.href=l,c&&m.setAttribute("nonce",c),document.head.appendChild(m),h)return new Promise((g,x)=>{m.addEventListener("load",g),m.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return n.then(a=>{for(const o of a||[])o.status==="rejected"&&r(o.reason);return e().catch(r)})};class Uv{worker=null;landmarker=null;modeInternal="worker";delegateInternal="CPU";busy=!1;pending=null;lastTimestamp=-1;disposed=!1;get mode(){return this.modeInternal}get delegate(){return this.delegateInternal}get isBusy(){return this.busy}async init(){try{await this.initWorker()}catch(e){console.warn("[vision] worker unavailable, falling back to main thread:",e),this.disposeWorker(),this.modeInternal="main",await this.initMainThread()}}initWorker(){return new Promise((e,t)=>{let i=!1,n;try{n=new Worker(new URL(""+new URL("vision.worker-BXq6gq_V.js",import.meta.url).href,import.meta.url),{type:"module"})}catch(a){t(a);return}const r=window.setTimeout(()=>{i||(i=!0,t(new Error("Vision worker did not become ready in time.")))},25e3);n.onerror=a=>{i||(i=!0,window.clearTimeout(r),t(new Error(a.message||"Vision worker failed to load.")))},n.onmessage=a=>{const o=a.data;if(o.type==="ready"){this.delegateInternal=o.delegate,i||(i=!0,window.clearTimeout(r),this.worker=n,this.modeInternal="worker",e());return}if(o.type==="result"){this.busy=!1;const c=this.pending;this.pending=null,c?.({hands:o.hands,timestamp:o.timestamp,inferenceMs:o.inferenceMs});return}if(o.type==="error"){if(!i){i=!0,window.clearTimeout(r),t(new Error(o.message));return}console.warn("[vision] worker error:",o.message),this.busy=!1;const c=this.pending;this.pending=null,c?.(null)}},n.postMessage({type:"init",wasmBasePath:Ct.wasmBasePath,modelAssetPath:Ct.modelAssetPath,numHands:Ct.numHands,minHandDetectionConfidence:Ct.minHandDetectionConfidence,minHandPresenceConfidence:Ct.minHandPresenceConfidence,minTrackingConfidence:Ct.minTrackingConfidence})})}async initMainThread(){const{FilesetResolver:e,HandLandmarker:t}=await Nv(async()=>{const{FilesetResolver:r,HandLandmarker:a}=await import("./vision_bundle-vJ7ggGnL.js");return{FilesetResolver:r,HandLandmarker:a}},[],import.meta.url),i=await e.forVisionTasks(Ct.wasmBasePath),n={baseOptions:{modelAssetPath:Ct.modelAssetPath,delegate:"GPU"},runningMode:"VIDEO",numHands:Ct.numHands,minHandDetectionConfidence:Ct.minHandDetectionConfidence,minHandPresenceConfidence:Ct.minHandPresenceConfidence,minTrackingConfidence:Ct.minTrackingConfidence};try{this.landmarker=await t.createFromOptions(i,n),this.delegateInternal="GPU"}catch{this.landmarker=await t.createFromOptions(i,{...n,baseOptions:{...n.baseOptions,delegate:"CPU"}}),this.delegateInternal="CPU"}}async detect(e,t){if(this.disposed||this.busy)return null;if(t<=this.lastTimestamp&&(t=this.lastTimestamp+1),this.lastTimestamp=t,this.modeInternal==="worker"&&this.worker){this.busy=!0;let n;try{n=await createImageBitmap(e)}catch{return this.busy=!1,null}return this.disposed||!this.worker?(n.close(),this.busy=!1,null):new Promise(r=>{this.pending=r,this.worker.postMessage({type:"frame",bitmap:n,timestamp:t},[n])})}if(!this.landmarker)return null;this.busy=!0;const i=performance.now();try{const n=this.landmarker.detectForVideo(e,t);return{hands:n.landmarks.map((a,o)=>({landmarks:a.map(c=>({x:c.x,y:c.y,z:c.z})),worldLandmarks:n.worldLandmarks[o]?.map(c=>({x:c.x,y:c.y,z:c.z}))??[],handedness:Ov(n.handedness[o]?.[0]?.categoryName),score:n.handedness[o]?.[0]?.score??0})),timestamp:t,inferenceMs:performance.now()-i}}catch(n){return console.warn("[vision] inference failed:",n),null}finally{this.busy=!1}}disposeWorker(){this.worker&&(this.worker.onmessage=null,this.worker.onerror=null,this.worker.terminate(),this.worker=null)}dispose(){if(this.disposed=!0,this.worker){try{this.worker.postMessage({type:"close"})}catch{}this.disposeWorker()}this.landmarker?.close(),this.landmarker=null,this.pending?.(null),this.pending=null}}function Ov(s){return s==="Left"||s==="Right"?s:"Unknown"}const Oc=.6;class Fv{events=new Ch;feed=new ll;pipeline=new Uv;smoothers=[new Nc,new Nc];engines=[new Dc,new Dc];tracked;stateInternal="OFF";enabled=!1;initialising=!1;lastInferenceAt=0;lastResultAt=0;missedFrames=0;inferenceMs=0;modelReady=!1;constructor(){this.tracked=[0,1].map(e=>({slot:e,active:!1,label:"Unknown",features:this.engines[e].current,lastSeen:-1/0}))}get state(){return this.stateInternal}get hands(){return this.tracked}get activeHandCount(){return this.tracked.reduce((e,t)=>e+(t.active?1:0),0)}get lastInferenceMs(){return this.inferenceMs}get visionMode(){return this.pipeline.mode}get delegate(){return this.pipeline.delegate}get isReady(){return this.modelReady&&this.feed.active}setState(e){this.stateInternal!==e&&(this.stateInternal=e,this.events.emit("state",e))}async enable(){if(this.enabled||this.initialising)return this.enabled;this.initialising=!0,this.setState("INITIALIZING");try{await this.feed.start()}catch(e){this.initialising=!1;const t=e;return this.setState(t?.kind==="denied"?"DENIED":"ERROR"),this.events.emit("error",t),!1}try{this.modelReady||(await this.pipeline.init(),this.modelReady=!0,this.events.emit("ready",{mode:this.pipeline.mode,delegate:this.pipeline.delegate}))}catch(e){return this.initialising=!1,this.feed.stop(),this.setState("ERROR"),this.events.emit("error",{kind:"unknown",message:e instanceof Error?`Hand tracking model failed to load: ${e.message}`:"Hand tracking model failed to load."}),!1}return this.enabled=!0,this.initialising=!1,this.setState("READY"),!0}disable(){this.enabled=!1,this.feed.stop();for(const e of this.tracked)e.active=!1;for(const e of this.smoothers)e.reset();for(const e of this.engines)e.reset();this.setState("OFF")}async toggle(){return this.enabled?(this.disable(),!1):this.enable()}get isEnabled(){return this.enabled}update(e){if(!this.enabled||!this.feed.ready)return;const t=1e3/Ct.targetInferenceFps;e-this.lastInferenceAt<t||this.pipeline.isBusy||(this.lastInferenceAt=e,this.pipeline.detect(this.feed.video,e).then(i=>{!i||!this.enabled||(this.inferenceMs=i.inferenceMs,this.events.emit("inference",{ms:i.inferenceMs,timestamp:i.timestamp}),this.ingest(i.hands,e))}))}ingest(e,t){const i=t/1e3,n=this.lastResultAt>0?Math.min(.2,i-this.lastResultAt):1/30;if(this.lastResultAt=i,e.length===0){if(this.missedFrames++,this.missedFrames>=Ct.lostFrames){for(const a of this.tracked)a.active=!1;this.setState(this.stateInternal==="TRACKING"?"TRACKING_LOST":"NO_HAND")}return}this.missedFrames=0;const r=this.assignSlots(e,i);for(let a=0;a<2;a++){const o=r[a],c=this.tracked[a];if(!o){c.active&&i-c.lastSeen>Oc&&(c.active=!1,this.smoothers[a].reset(),this.engines[a].reset());continue}const l=this.smoothers[a].filter(o.landmarks,n),h=this.engines[a].update(l,o.worldLandmarks,o.handedness,o.score,n,i);c.features=h,c.active=!0,c.lastSeen=i,c.label=Bv(o.handedness)}this.setState("TRACKING")}assignSlots(e,t){const i=[null,null],n=e.slice(0,2),r=(c,l)=>{const h=this.tracked[l];if(!h.active||t-h.lastSeen>Oc)return 1.5;const p=h.features.position,u=c.landmarks[0],m=Math.hypot(u.x-p.x,u.y-p.y),g=h.features.handedness===c.handedness?-.35:.15;return m+g};if(n.length===1){const c=r(n[0],0)<=r(n[0],1)?0:1;return i[c]=n[0],i}const a=r(n[0],0)+r(n[1],1),o=r(n[0],1)+r(n[1],0);return a<=o?(i[0]=n[0],i[1]=n[1]):(i[0]=n[1],i[1]=n[0]),i}dispose(){this.disable(),this.pipeline.dispose(),this.events.clear()}}function Bv(s){return s==="Left"?"Right":s==="Right"?"Left":"Unknown"}function Re(s,e,t){const i=document.createElement(s);return e&&(i.className=e),t!==void 0&&(i.textContent=t),i}function qt(s,e="—",t=""){const i=Re("div",`row ${t}`.trim()),n=Re("span","key",s),r=Re("span","value",e);i.append(n,r);let a=e;return{root:i,value:r,setValue(o){o!==a&&(a=o,r.textContent=o)},setLevel(o){i.classList.toggle("warn",o==="warn"),i.classList.toggle("bad",o==="bad")}}}function br(){const s=Re("div","meter"),e=Re("i");s.append(e);let t=-1;return{root:s,set(i){const n=Math.round(Math.max(0,Math.min(1,i))*100);n!==t&&(t=n,e.style.width=`${n}%`)},setWarm(i){s.classList.toggle("warm",i)}}}function ka(){return Re("div","divider")}function za(s,e){const t=Re("div","panel-title");return t.append(Re("span",void 0,s)),e&&t.append(Re("span","tag",e)),t}function Er(s){return`${Math.round(Math.max(0,Math.min(1,s))*100)}%`}const kv=[["PINCH","ROTATE"],["OPEN PALM","ACTIVATE"],["FIST","POWER"],["TWO HANDS","SCALE"],["POINT","SELECT"],["SWIPE","MODE"]];class zv{toasts;modeRoot;modeName;modeSub;legend;legendTimer=0;legendFaded=!1;lastMessage="";lastMessageAt=-1/0;elapsed=0;constructor(e){this.toasts=Re("div","toasts"),this.modeRoot=Re("div","hud-mode"),this.modeName=Re("div","mode-name","NEURAL NETWORK"),this.modeSub=Re("div","mode-sub","CONFIGURATION 01 / 05"),this.modeRoot.append(this.modeName,this.modeSub),this.legend=Re("div","hud-legend");for(const[t,i]of kv){const n=Re("div","legend-item"),r=Re("b",void 0,t);n.append(r,document.createTextNode(` — ${i}`)),this.legend.append(n)}e.append(this.toasts,this.modeRoot,this.legend)}toast(e,t="normal"){if(e===this.lastMessage&&this.elapsed-this.lastMessageAt<1)return;this.lastMessage=e,this.lastMessageAt=this.elapsed;const i=Re("div",t==="warn"?"toast warn":"toast",e);for(this.toasts.append(i),window.setTimeout(()=>{i.classList.add("leaving"),window.setTimeout(()=>i.remove(),340)},Ga.toastSeconds*1e3);this.toasts.childElementCount>3;)this.toasts.firstElementChild?.remove()}setMode(e,t,i,n=!0){this.modeName.textContent=e,this.modeSub.textContent=`CONFIGURATION ${String(t+1).padStart(2,"0")} / ${String(i).padStart(2,"0")}`,n&&(this.modeRoot.classList.remove("switching"),this.modeRoot.offsetWidth,this.modeRoot.classList.add("switching"))}notifyActivity(){this.legendFaded||(this.legendTimer=0)}update(e){this.elapsed+=e,!this.legendFaded&&(this.legendTimer+=e,this.legendTimer>=Ga.legendVisibleSeconds&&(this.legendFaded=!0,this.legend.classList.add("faded")))}}class Hv{root;statusText;timeText;dot;controls;buttons=new Map;notice=null;handlers=new Map;constructor(e){this.root=Re("div","hud-top");const t=Re("div","brand",Ls.name),i=Re("div","subtitle",Ls.subtitle),n=Re("div","status");this.dot=Re("span","dot"),this.statusText=Re("span",void 0,"ONLINE"),this.timeText=Re("span","hud-clock","UTC 00:00:00.000"),n.append(this.dot,this.statusText,Re("span","chrono-sep","■"),this.timeText),this.root.append(t,i,n),e.append(this.root),this.controls=Re("div","controls"),e.append(this.controls)}setStatus(e,t="ok"){this.statusText.textContent=e,this.dot.classList.toggle("warn",t==="warn"),this.dot.classList.toggle("bad",t==="bad")}setTime(e){this.timeText.textContent=e}addControl(e,t){const i=Re("button","ctl");i.type="button",i.dataset.on=String(e.on??!1),i.setAttribute("aria-label",e.label);const n=Re("span","label",e.label),r=Re("span","state",e.initialState);i.append(n,r),i.addEventListener("click",t),this.controls.append(i),this.buttons.set(e.id,{button:i,state:r}),this.handlers.set(e.id,t)}setControlState(e,t,i){const n=this.buttons.get(e);n&&(n.state.textContent=t,i!==void 0&&(n.button.dataset.on=String(i)))}trigger(e){this.handlers.get(e)?.()}showNotice(e){this.hideNotice();const t=Re("div","notice");if(t.setAttribute("role","alertdialog"),t.append(Re("h2",void 0,e.title)),t.append(Re("p",void 0,e.body)),e.actions?.length){const i=Re("div","controls");i.style.position="static",i.style.flexDirection="row",i.style.justifyContent="center";for(const n of e.actions){const r=Re("button","ctl");r.type="button",r.style.minWidth="auto",r.append(Re("span","label",n.label)),r.addEventListener("click",n.onClick),i.append(r)}t.append(i)}this.notice=t,this.root.parentElement?.append(t)}hideNotice(){this.notice?.remove(),this.notice=null}get noticeVisible(){return this.notice!==null}}const Kn=s=>e=>Number(e).toFixed(s),Zn=s=>Number(s).toLocaleString(),Jn=s=>String(s),Fc=[["fps","RENDER FPS",Kn(1)],["inferenceFps","INFERENCE FPS",Kn(0)],["inferenceMs","INFERENCE MS",Kn(1)],["visionMode","VISION THREAD",Jn],["delegate","DELEGATE",Jn],["cameraState","CAMERA",Jn],["gestureState","GESTURE STATE",Jn],["confidence","CONFIDENCE",Kn(2)],["handWorld","HAND WORLD",Jn],["pinchDistance","PINCH DIST",Kn(3)],["particles","PARTICLES",Zn],["connections","CONNECTIONS",Zn],["motes","DATA MOTES",Zn],["quality","QUALITY",Jn],["drawCalls","DRAW CALLS",Zn],["triangles","TRIANGLES",Zn],["programs","PROGRAMS",Zn],["pixelRatio","PIXEL RATIO",Kn(2)]];class Vv{root;canvas;ctx;previewHost;values=new Map;open=!1;video=null;showIndices=!0;constructor(e){this.root=Re("div","debug"),this.previewHost=Re("div","preview"),this.canvas=Re("canvas"),this.canvas.width=320,this.canvas.height=240,this.ctx=this.canvas.getContext("2d"),this.previewHost.append(this.canvas);const t=Re("div","readouts");for(const[i,n]of Fc){const r=Re("div");r.append(Re("span",void 0,n));const a=Re("b",void 0,"—");r.append(a),t.append(r),this.values.set(i,a)}this.root.append(this.previewHost,t),e.append(this.root)}get isOpen(){return this.open}toggle(){return this.setOpen(!this.open),this.open}setOpen(e){this.open=e,this.root.classList.toggle("open",e)}toggleIndices(){this.showIndices=!this.showIndices}attachVideo(e){this.video!==e&&(this.video?.remove(),this.video=e,e.style.display="block",this.previewHost.prepend(e))}detachVideo(){this.video?.remove(),this.video=null}update(e){if(this.open)for(const[t,,i]of Fc){const n=e[t];if(n===void 0)continue;const r=this.values.get(t);r&&(r.textContent=i(n))}}drawLandmarks(e){if(!this.open||!this.ctx)return;const t=this.ctx,{width:i,height:n}=this.canvas;t.clearRect(0,0,i,n);for(const r of e)if(!(!r||r.length<hi)){t.strokeStyle=xl.cyanDim,t.lineWidth=1.4,t.beginPath();for(const[a,o]of Bo)t.moveTo(r[a].x*i,r[a].y*n),t.lineTo(r[o].x*i,r[o].y*n);t.stroke(),t.fillStyle=xl.cyan;for(let a=0;a<hi;a++){const o=r[a].x*i,c=r[a].y*n;t.beginPath(),t.arc(o,c,a%4===0?3.1:2.1,0,Math.PI*2),t.fill()}if(this.showIndices){t.save(),t.scale(-1,1),t.font="9px monospace",t.fillStyle="rgba(234, 255, 255, 0.75)";for(let a=0;a<hi;a++){const o=r[a].x*i,c=r[a].y*n;t.fillText(String(a),-o+4,c-4)}t.restore()}}}}class Gv{status;gestures;debug;root;leftPanel;rightPanel;trackingRows=[];gestureRow;handCountRow;palmStateRow;openedAtRow;openDurationRow;openMeter;powerRow;powerMeter;neuralRow;neuralMeter;gpuRow;gpuMeter;latencyRow;fpsRow;qualityRow;processingRow;energyRow;smoothPower=0;smoothNeural=0;smoothGpu=0;smoothLatency=0;visible=!0;constructor(e){this.root=Re("div","hud-root"),e.append(this.root),this.status=new Hv(this.root),this.gestures=new zv(this.root),this.debug=new Vv(this.root),this.leftPanel=Re("div","panel hud-left"),this.leftPanel.append(za("HAND TRACKING","LOCAL"));for(const n of["LEFT HAND","RIGHT HAND"]){const r=Re("div","row");r.append(Re("span","key",n)),this.leftPanel.append(r);const a=qt("TRACKING","STANDBY","sub"),o=qt("CONFIDENCE","—","sub");this.leftPanel.append(a.root,o.root),this.trackingRows.push({state:a,confidence:o})}this.leftPanel.append(ka()),this.gestureRow=qt("GESTURE","STANDBY"),this.handCountRow=qt("HANDS","0"),this.leftPanel.append(this.gestureRow.root,this.handCountRow.root),this.leftPanel.append(ka()),this.leftPanel.append(za("PALM CHRONO","REAL-TIME")),this.palmStateRow=qt("PALM STATE","STANDBY"),this.openedAtRow=qt("OPENED AT","—"),this.openDurationRow=qt("OPEN TIME","0.00s"),this.openMeter=br(),this.leftPanel.append(this.palmStateRow.root,this.openedAtRow.root,this.openDurationRow.root,this.openMeter.root),this.root.append(this.leftPanel),this.rightPanel=Re("div","panel hud-right"),this.rightPanel.append(za("CORE SYSTEM",Ls.build)),this.powerRow=qt("POWER","0%"),this.powerMeter=br(),this.neuralRow=qt("NEURAL","0%"),this.neuralMeter=br(),this.gpuRow=qt("GPU (EST)","0%"),this.gpuMeter=br(),this.rightPanel.append(this.powerRow.root,this.powerMeter.root,this.neuralRow.root,this.neuralMeter.root,this.gpuRow.root,this.gpuMeter.root,ka()),this.latencyRow=qt("LATENCY","—"),this.fpsRow=qt("FPS","—"),this.qualityRow=qt("QUALITY","HIGH"),this.processingRow=qt("PROCESSING","IDLE"),this.energyRow=qt("ENERGY","NOMINAL"),this.rightPanel.append(this.latencyRow.root,this.fpsRow.root,this.qualityRow.root,this.processingRow.root,this.energyRow.root);const t=Re("div","row sub");t.append(Re("span",void 0,"GPU LOAD IS ESTIMATED FROM FRAME TIME")),this.rightPanel.append(t),this.root.append(this.rightPanel);const i=Re("div","privacy");i.append(document.createTextNode("CAMERA PROCESSING: ")),i.append(Re("b",void 0,"LOCAL")),i.append(document.createTextNode(" — NO FRAMES LEAVE THIS DEVICE")),this.root.append(i)}setVisible(e){this.visible=e,this.root.parentElement?.classList.toggle("hidden",!e)}toggleVisible(){return this.setVisible(!this.visible),this.visible}get isVisible(){return this.visible}update(e,t){if(this.gestures.update(e),!this.visible)return;const i=Ga.readoutDamping;this.smoothPower=Ke(this.smoothPower,Rt(t.power),i,e),this.smoothNeural=Ke(this.smoothNeural,Rt(t.neural),i,e),this.smoothGpu=Ke(this.smoothGpu,Rt(t.gpuEstimate),i*.6,e),this.smoothLatency=Ke(this.smoothLatency,t.latencyMs,i,e),this.status.setStatus(t.cameraLabel,t.cameraLevel),this.status.setTime(t.realtimeClock);for(let n=0;n<2;n++){const r=t.hands[n],a=this.trackingRows[n];a.state.setValue(r.present?"ACTIVE":"STANDBY"),a.state.setLevel(r.present?"normal":"warn"),a.confidence.setValue(r.present?Er(r.confidence):"—")}this.gestureRow.setValue(t.gestureLabel),this.handCountRow.setValue(String(t.handCount)),this.palmStateRow.setValue(t.isHandOpen?"OPEN PALM [ACTIVE]":"STANDBY / IDLE"),this.palmStateRow.setLevel(t.isHandOpen?"normal":"warn"),this.openedAtRow.setValue(t.handOpenedAt),this.openDurationRow.setValue(t.isHandOpen?`${t.handOpenDuration.toFixed(2)}s (ACTIVE)`:t.handOpenDuration>0?`${t.handOpenDuration.toFixed(2)}s (HOLD)`:"0.00s"),this.openMeter.set(t.handOpenness),this.powerRow.setValue(Er(this.smoothPower)),this.powerMeter.set(this.smoothPower),this.neuralRow.setValue(Er(this.smoothNeural)),this.neuralMeter.set(this.smoothNeural),this.gpuRow.setValue(Er(this.smoothGpu)),this.gpuMeter.set(this.smoothGpu),this.gpuMeter.setWarm(this.smoothGpu>.85),this.gpuRow.setLevel(this.smoothGpu>.85?"warn":"normal"),this.latencyRow.setValue(this.smoothLatency>0?`${this.smoothLatency.toFixed(0)}ms`:"—"),this.fpsRow.setValue(t.fps>0?t.fps.toFixed(0):"—"),this.fpsRow.setLevel(t.fps>0&&t.fps<40?"warn":"normal"),this.qualityRow.setValue(t.quality),this.processingRow.setValue(t.processing),this.energyRow.setValue(t.energyLabel)}}const Ui=[{text:"SYSTEM INITIALIZING...",hold:.85},{text:"NEURAL NETWORK ONLINE",hold:.8},{text:"CORE SYNCHRONIZATION",hold:.85},{text:`${Ls.name} CORE ONLINE`,hold:.9,final:!0},{text:"READY FOR INTERACTION",hold:.7}];class Wv{constructor(e,t=!1){this.reducedMotion=t,this.root=Re("div","boot"),this.lines=Re("div","boot-lines"),this.lines.style.display="flex",this.lines.style.flexDirection="column",this.lines.style.alignItems="center",this.lines.style.gap="10px";const i=Re("div","boot-bar");this.bar=Re("i"),i.append(this.bar),this.root.append(this.lines,i),e.append(this.root),t&&this.pushLine(Ui[Ui.length-1])}root;bar;lines;index=0;timer=0;elapsed=0;finished=!1;formationStarted=!1;skipRequested=!1;onFormationStart=null;onComplete=null;onStep=null;skip(){this.skipRequested=!0}get isFinished(){return this.finished}update(e){if(this.finished)return;this.elapsed+=e,this.timer+=e;const t=this.reducedMotion?.6:Ui.reduce((i,n)=>i+n.hold,0);if(this.bar.style.width=`${Math.min(100,this.elapsed/t*100)}%`,!this.formationStarted&&(this.elapsed>.9||this.reducedMotion||this.skipRequested)&&(this.formationStarted=!0,this.root.classList.add("transparent"),this.onFormationStart?.()),this.skipRequested||this.reducedMotion){this.elapsed>(this.reducedMotion?.8:.2)&&this.complete();return}if(this.index<Ui.length&&this.timer>=(this.index===0?.25:Ui[this.index-1].hold)){const i=Ui[this.index];this.pushLine(i),this.onStep?.(i,this.index),this.index++,this.timer=0;return}if(this.index>=Ui.length){const i=Ui[Ui.length-1].hold,n=this.elapsed>=.9+We.formationSeconds*.85;this.timer>=i&&n&&this.complete()}}pushLine(e){const t=Re("div",e.final?"boot-line final":"boot-line",e.text);for(this.lines.append(t);this.lines.childElementCount>5;)this.lines.firstElementChild?.remove()}complete(){this.finished||(this.finished=!0,this.root.classList.add("done"),window.setTimeout(()=>this.root.remove(),1e3),this.onComplete?.())}}class Xv{context=null;master=null;ambience=null;enabled=wr.enabledByDefault;unlocked=!1;get isEnabled(){return this.enabled}init(e){this.enabled=e}async setEnabled(e){if(this.enabled=e,!e)return this.stopAmbience(),this.master&&(this.master.gain.value=0),!1;try{return await this.ensureContext(),this.master&&this.context&&this.master.gain.setTargetAtTime(wr.masterGain,this.context.currentTime,.2),this.startAmbience(),!0}catch{return this.enabled=!1,!1}}setVolume(e){if(this.master&&this.context){const t=Math.max(0,Math.min(1,e));this.master.gain.setTargetAtTime(t*wr.masterGain,this.context.currentTime,.05)}}async ensureContext(){if(!this.context){const e=window.AudioContext??window.webkitAudioContext;if(!e)throw new Error("Web Audio is unavailable.");this.context=new e,this.master=this.context.createGain(),this.master.gain.value=0,this.master.connect(this.context.destination)}return this.context.state==="suspended"&&await this.context.resume(),this.unlocked=!0,this.context}startAmbience(){if(!this.context||!this.master||this.ambience)return;const e=this.context.createGain();e.gain.value=.14,e.connect(this.master);const t=[];for(const[r,a]of[[55,0],[82.5,6],[110,-7]]){const o=this.context.createOscillator();o.type="sine",o.frequency.value=r,o.detune.value=a,o.connect(e),o.start(),t.push(o)}const i=this.context.createOscillator(),n=this.context.createGain();i.frequency.value=.07,n.gain.value=.06,i.connect(n),n.connect(e.gain),i.start(),t.push(i),this.ambience={osc:t,gain:e}}stopAmbience(){if(this.ambience){for(const e of this.ambience.osc){try{e.stop()}catch{}e.disconnect()}this.ambience.gain.disconnect(),this.ambience=null}}play(e){if(!(!this.enabled||!this.unlocked||!this.context||!this.master))switch(e){case"handDetected":this.tone(392,622.25,.28,"sine",.5);break;case"handLost":this.tone(392,196,.3,"sine",.32);break;case"pinch":this.click(1650,.05,.42);break;case"release":this.click(880,.07,.28);break;case"select":this.tone(880,1320,.16,"triangle",.45),window.setTimeout(()=>this.click(2100,.04,.3),90);break;case"mode":this.sweep(240,1400,.34,.3);break;case"power":{this.tone(120,42,.7,"sine",.75),this.noise(.45,.32);break}case"boot":this.tone(180,540,.9,"sine",.35);break}}envelope(e,t){const i=this.context,n=i.createGain(),r=i.currentTime;return n.gain.setValueAtTime(1e-4,r),n.gain.exponentialRampToValueAtTime(Math.max(2e-4,t),r+.012),n.gain.exponentialRampToValueAtTime(1e-4,r+e),n.connect(this.master),n}tone(e,t,i,n,r){const a=this.context,o=a.createOscillator(),c=this.envelope(i,r);o.type=n,o.frequency.setValueAtTime(e,a.currentTime),o.frequency.exponentialRampToValueAtTime(Math.max(1,t),a.currentTime+i),o.connect(c),o.start(),o.stop(a.currentTime+i+.05)}click(e,t,i){const n=this.context,r=n.createOscillator(),a=this.envelope(t,i),o=n.createBiquadFilter();o.type="bandpass",o.frequency.value=e,o.Q.value=6,r.type="square",r.frequency.value=e,r.connect(o),o.connect(a),r.start(),r.stop(n.currentTime+t+.03)}sweep(e,t,i,n){const r=this.context,a=r.createOscillator(),o=r.createBiquadFilter(),c=this.envelope(i,n);o.type="lowpass",o.frequency.setValueAtTime(e*2,r.currentTime),o.frequency.exponentialRampToValueAtTime(t*2,r.currentTime+i),a.type="sawtooth",a.frequency.setValueAtTime(e,r.currentTime),a.frequency.exponentialRampToValueAtTime(t,r.currentTime+i),a.connect(o),o.connect(c),a.start(),a.stop(r.currentTime+i+.05)}noise(e,t){const i=this.context,n=Math.floor(i.sampleRate*e),r=i.createBuffer(1,n,i.sampleRate),a=r.getChannelData(0);for(let h=0;h<n;h++)a[h]=(Math.random()*2-1)*Math.pow(1-h/n,2.4);const o=i.createBufferSource(),c=i.createBiquadFilter();c.type="lowpass",c.frequency.value=900;const l=this.envelope(e,t);o.buffer=r,o.connect(c),c.connect(l),o.start()}dispose(){this.stopAmbience(),this.context?.close(),this.context=null,this.master=null}}const zo={HOME:{label:"BRAHMASTRA AI",icon:"🪐",desc:"Neural Intelligence Core"},REHAB:{label:"REHAB TRACKER",icon:"🏥",desc:"Hand Rehabilitation & 1-Min Cadence"},PANEL:{label:"CONTROL CONSOLE",icon:"🎛️",desc:"Real Touchless System Console"},PHOTO:{label:"AIR SHUTTER STUDIO",icon:"📸",desc:"Touchless Hands-Free Photo Studio"},SLIDES:{label:"PRESENTATION DECK",icon:"🎤",desc:"Keynote Stage & Gesture Controller"}};class qv{current="HOME";listeners=[];get mode(){return this.current}set(e){if(e===this.current)return;const t=this.current;this.current=e;for(const i of this.listeners)i({from:t,to:e})}onModeChange(e){this.listeners.push(e)}cycle(e){const t=["HOME","REHAB","PANEL","PHOTO","SLIDES"],i=t.indexOf(this.current),n=t[(i+e+t.length)%t.length];return this.set(n),n}}class Yv{el;buttons=new Map;onChange=null;constructor(e){this.el=document.createElement("div"),this.el.className="mode-switcher",this.el.setAttribute("role","tablist"),this.el.setAttribute("aria-label","Application Modes");const t=["HOME","REHAB","PANEL","PHOTO","SLIDES"];for(const i of t){const n=zo[i],r=document.createElement("button");r.className="mode-tab"+(i==="HOME"?" active":""),r.setAttribute("role","tab"),r.setAttribute("aria-selected",i==="HOME"?"true":"false"),r.id=`mode-tab-${i.toLowerCase()}`,r.innerHTML=`
        <span class="mode-tab-icon">${n.icon}</span>
        <span class="mode-tab-label">${n.label}</span>
      `,r.addEventListener("click",()=>{this.onChange&&this.onChange(i)}),this.buttons.set(i,r),this.el.append(r)}e.append(this.el)}setActive(e){for(const[t,i]of this.buttons){const n=t===e;i.classList.toggle("active",n),i.setAttribute("aria-selected",String(n))}}onModeChange(e){this.onChange=e}}const ws=[{id:"grip",name:"GRIP STRENGTH",instruction:"Make a tight FIST → Open PALM wide. Repeat."},{id:"index",name:"INDEX ISOLATION",instruction:"Extend only your INDEX finger while keeping others folded."},{id:"wrist",name:"WRIST ROTATION",instruction:"Rotate wrist LEFT (-90°) → RIGHT (+90°) smoothly."},{id:"spread",name:"FINGER SPREAD",instruction:"Spread ALL 5 fingers wide outward, then close tightly."}];class $v{el=null;visible=!1;currentExercise=0;states=ws.map(()=>({reps:0,phase:"IDLE",bestRpm:0,drillReps:0,wristMin:1/0,wristMax:-1/0}));drillActive=!1;drillTimeRemaining=60;drillReps=0;fingerBars=[];fingerLabels=[];wristDial=null;wristValue=null;repDisplay=null;rpmDisplay=null;drillTimerDisplay=null;drillBtn=null;phaseDisplay=null;exerciseInstr=null;palmRing=null;palmPct=null;sessionTime=0;sessionEl=null;build(e){this.el=document.createElement("div"),this.el.className="mode-overlay rehab-overlay hidden",this.el.innerHTML=`
      <div class="mode-header">
        <span class="mode-icon">🏥</span>
        <div>
          <div class="mode-title">HAND REHABILITATION TRACKER</div>
          <div class="mode-sub">Real-time physiotherapy assistant • 1-Minute Cadence & Mobility Tracking</div>
        </div>
        <div class="mode-session" id="rehab-session">SESSION 00:00</div>
      </div>

      <div class="rehab-body">

        <!-- EXERCISE SELECTOR -->
        <div class="rehab-card exercise-card">
          <div class="rehab-card-title">EXERCISE SELECTION</div>
          <div class="rehab-exercise-tabs" id="rehab-tabs"></div>
          <div class="rehab-instr" id="rehab-instr">—</div>
        </div>

        <!-- FINGER BARS -->
        <div class="rehab-card">
          <div class="rehab-card-title">FINGER EXTENSION LIVE</div>
          <div class="finger-bars" id="finger-bars"></div>
        </div>

        <!-- PALM OPENNESS -->
        <div class="rehab-card palm-card">
          <div class="rehab-card-title">PALM OPENNESS</div>
          <div class="palm-ring-wrap">
            <div class="palm-ring" id="palm-ring">
              <div class="palm-ring-fill" id="palm-ring-fill"></div>
              <div class="palm-pct" id="palm-pct">0%</div>
            </div>
          </div>
        </div>

        <!-- WRIST ROTATION -->
        <div class="rehab-card wrist-card">
          <div class="rehab-card-title">WRIST ROTATION</div>
          <div class="wrist-track">
            <div class="wrist-bar">
              <div class="wrist-indicator" id="wrist-indicator"></div>
            </div>
            <div class="wrist-labels"><span>-90°</span><span>0°</span><span>+90°</span></div>
          </div>
          <div class="wrist-val" id="wrist-val">0°</div>
        </div>

        <!-- 1-MINUTE DRILL & REPS COUNTER -->
        <div class="rehab-card reps-card">
          <div class="rehab-card-title">1-MINUTE DRILL & REPS</div>
          
          <div class="reps-drill-controls">
            <button class="rehab-drill-btn" id="rehab-drill-toggle">▶ START 1-MIN DRILL</button>
            <button class="rehab-drill-btn reset-btn" id="rehab-drill-reset">↺ RESET</button>
          </div>

          <div class="drill-timer-box">
            <span class="drill-timer-label">TIME LEFT:</span>
            <span class="drill-timer-digits" id="rehab-drill-timer">60s</span>
            <div class="drill-progress-track">
              <div class="drill-progress-bar" id="rehab-drill-bar" style="width:100%"></div>
            </div>
          </div>

          <div class="reps-stats-row">
            <div class="stat-col">
              <div class="stat-label">TOTAL REPS</div>
              <div class="reps-big" id="rehab-reps">0</div>
            </div>
            <div class="stat-col">
              <div class="stat-label">SPEED / CADENCE</div>
              <div class="rpm-rate" id="rehab-rpm">0 <span class="rate-unit">REPS/MIN</span></div>
            </div>
          </div>

          <div class="reps-phase" id="rehab-phase">READY — SHOW HAND TO CAMERA</div>
        </div>

        <!-- PROGRESS -->
        <div class="rehab-card progress-card">
          <div class="rehab-card-title">SESSION PERFORMANCE & BEST 1-MIN PACE</div>
          <div class="progress-list" id="rehab-progress-list"></div>
        </div>

      </div>
    `,e.append(this.el),this.sessionEl=this.el.querySelector("#rehab-session"),this.repDisplay=this.el.querySelector("#rehab-reps"),this.rpmDisplay=this.el.querySelector("#rehab-rpm"),this.drillTimerDisplay=this.el.querySelector("#rehab-drill-timer"),this.drillBtn=this.el.querySelector("#rehab-drill-toggle"),this.phaseDisplay=this.el.querySelector("#rehab-phase"),this.exerciseInstr=this.el.querySelector("#rehab-instr"),this.palmRing=this.el.querySelector("#palm-ring"),this.palmPct=this.el.querySelector("#palm-pct"),this.wristDial=this.el.querySelector("#wrist-indicator"),this.wristValue=this.el.querySelector("#wrist-val"),this.drillBtn?.addEventListener("click",()=>this.toggleDrill()),this.el.querySelector("#rehab-drill-reset")?.addEventListener("click",()=>this.resetDrill()),this.buildFingerBars(),this.buildExerciseTabs(),this.updateExercise()}toggleDrill(){this.drillActive?(this.drillActive=!1,this.drillBtn&&(this.drillBtn.textContent="▶ RESUME 1-MIN DRILL",this.drillBtn.classList.remove("running"))):(this.drillTimeRemaining<=0&&(this.drillTimeRemaining=60,this.drillReps=0),this.drillActive=!0,this.drillBtn&&(this.drillBtn.textContent="⏸ PAUSE DRILL",this.drillBtn.classList.add("running")),this.phaseDisplay&&(this.phaseDisplay.textContent="🔥 1-MIN DRILL ACTIVE — MOVE FAST & ACCURATE!"))}resetDrill(){this.drillActive=!1,this.drillTimeRemaining=60,this.drillReps=0,this.drillBtn&&(this.drillBtn.textContent="▶ START 1-MIN DRILL",this.drillBtn.classList.remove("running")),this.drillTimerDisplay&&(this.drillTimerDisplay.textContent="60s");const e=this.el?.querySelector("#rehab-drill-bar");e&&(e.style.width="100%");const t=this.states[this.currentExercise];t.drillReps=0,this.phaseDisplay&&(this.phaseDisplay.textContent="DRILL RESET — PRESS START WHEN READY")}buildFingerBars(){const e=this.el.querySelector("#finger-bars"),t=["THUMB","INDEX","MIDDLE","RING","PINKY"];for(let i=0;i<5;i++){const n=document.createElement("div");n.className="finger-col",n.innerHTML=`
        <div class="finger-track"><div class="finger-fill" id="finger-fill-${i}"></div></div>
        <div class="finger-label">${t[i]}</div>
        <div class="finger-pct" id="finger-pct-${i}">0%</div>
      `,e.append(n),this.fingerBars.push(n.querySelector(`#finger-fill-${i}`)),this.fingerLabels.push(n.querySelector(`#finger-pct-${i}`))}}buildExerciseTabs(){const e=this.el.querySelector("#rehab-tabs");ws.forEach((t,i)=>{const n=document.createElement("button");n.className="rehab-tab"+(i===0?" active":""),n.textContent=t.name,n.addEventListener("click",()=>{this.currentExercise=i,e.querySelectorAll(".rehab-tab").forEach((r,a)=>r.classList.toggle("active",a===i)),this.updateExercise()}),e.append(n)})}updateExercise(){const e=ws[this.currentExercise];this.exerciseInstr&&(this.exerciseInstr.textContent=e.instruction);const t=this.states[this.currentExercise];this.repDisplay&&(this.repDisplay.textContent=String(t.reps)),this.updateCadenceDisplay(),this.buildProgressList()}updateCadenceDisplay(){const e=this.states[this.currentExercise];let t=0;if(this.drillActive&&60-this.drillTimeRemaining>1){const i=(60-this.drillTimeRemaining)/60;t=Math.round(this.drillReps/i)}else if(this.sessionTime>5){const i=this.sessionTime/60;t=Math.round(e.reps/Math.max(.2,i))}this.rpmDisplay&&(this.rpmDisplay.innerHTML=`${t} <span class="rate-unit">REPS/MIN</span>`)}buildProgressList(){const e=this.el?.querySelector("#rehab-progress-list");e&&(e.innerHTML="",ws.forEach((t,i)=>{const n=this.states[i],r=document.createElement("div");r.className="progress-row";const a=n.bestRpm>0?`${n.bestRpm}/min`:"—";r.innerHTML=`
        <span class="progress-name">${t.name}</span>
        <div class="progress-track">
          <div class="progress-fill" style="width:${Math.min(100,n.reps*4)}%"></div>
        </div>
        <span class="progress-count">${n.reps} reps <small style="color:#2ff3ff;opacity:0.8">(1-Min Best: ${a})</small></span>
      `,e.append(r)}))}update(e,t){if(!this.visible||!this.el)return;this.sessionTime+=e;const i=Math.floor(this.sessionTime/60),n=Math.floor(this.sessionTime%60);if(this.sessionEl&&(this.sessionEl.textContent=`SESSION ${String(i).padStart(2,"0")}:${String(n).padStart(2,"0")}`),this.drillActive){this.drillTimeRemaining=Math.max(0,this.drillTimeRemaining-e),this.drillTimerDisplay&&(this.drillTimerDisplay.textContent=`${Math.ceil(this.drillTimeRemaining)}s`);const f=this.el.querySelector("#rehab-drill-bar");if(f&&(f.style.width=`${(this.drillTimeRemaining/60*100).toFixed(1)}%`),this.drillTimeRemaining<=0){this.drillActive=!1;const d=this.states[this.currentExercise];this.drillReps>d.bestRpm&&(d.bestRpm=this.drillReps),this.drillBtn&&(this.drillBtn.textContent="🏆 COMPLETED! START AGAIN",this.drillBtn.classList.remove("running")),this.phaseDisplay&&(this.phaseDisplay.textContent=`🎉 1-MIN DRILL FINISHED! YOU COMPLETED ${this.drillReps} REPS!`)}}const r=t.find(f=>f.active);if(!r){this.phaseDisplay&&!this.drillActive&&(this.phaseDisplay.textContent="NO HAND — SHOW HAND TO CAMERA");return}for(let f=0;f<5;f++){const d=r.extension?.[f]??0;this.fingerBars[f]&&(this.fingerBars[f].style.height=`${(d*100).toFixed(0)}%`),this.fingerLabels[f]&&(this.fingerLabels[f].textContent=`${(d*100).toFixed(0)}%`)}const a=r.palmOpenness??0,o=a*360;this.palmRing&&(this.palmRing.style.background=`conic-gradient(#2ff3ff ${o}deg, rgba(47,243,255,0.1) ${o}deg)`),this.palmPct&&(this.palmPct.textContent=`${(a*100).toFixed(0)}%`);const l=(r.palmRoll??0)*180/Math.PI,p=(Math.max(-90,Math.min(90,l))+90)/180;this.wristDial&&(this.wristDial.style.left=`${(p*100).toFixed(1)}%`),this.wristValue&&(this.wristValue.textContent=`${l.toFixed(0)}°`);const u=this.currentExercise,m=this.states[u],g=ws[u];let x=!1;if(g.id==="grip"){const f=r.gesture==="FIST",d=r.gesture==="OPEN_PALM"||(r.extendedCount??0)>=4;m.phase==="IDLE"||m.phase==="OPEN"?f&&(m.phase="CLOSE"):m.phase==="CLOSE"&&d&&(m.phase="OPEN",m.reps++,x=!0)}else if(g.id==="index"){const f=r.extension?.[1]??0,d=(r.extension?.[2]??0)<.4&&(r.extension?.[3]??0)<.4&&(r.extension?.[4]??0)<.4;m.phase==="IDLE"||m.phase==="CLOSE"?f>.8&&d&&(m.phase="OPEN",m.reps++,x=!0):m.phase==="OPEN"&&f<.3&&(m.phase="CLOSE")}else if(g.id==="wrist")l<m.wristMin&&(m.wristMin=l),l>m.wristMax&&(m.wristMax=l),m.wristMax-m.wristMin>60&&m.phase!=="OPEN"&&(m.phase="OPEN",m.reps++,x=!0,m.wristMin=1/0,m.wristMax=-1/0);else if(g.id==="spread"){const f=(r.extendedCount??0)>=4,d=r.gesture==="FIST";m.phase==="IDLE"||m.phase==="CLOSE"?f&&(m.phase="OPEN"):m.phase==="OPEN"&&d&&(m.phase="CLOSE",m.reps++,x=!0)}x&&this.drillActive&&this.drillReps++,this.repDisplay&&(this.repDisplay.textContent=String(m.reps)),this.phaseDisplay&&!this.drillActive&&(this.phaseDisplay.textContent=m.phase==="OPEN"?"▲ HOLD OPEN":m.phase==="CLOSE"?"▼ CLOSE HAND":"READY — BEGIN REPS"),this.updateCadenceDisplay(),this.buildProgressList()}setVisible(e){this.visible=e,this.el?.classList.toggle("hidden",!e)}dispose(){this.el?.remove()}}class Kv{el=null;visible=!1;bridge=null;volume=.8;brightness=1;orbitSpeed=1;cameraDistance=.5;soundEnabled=!0;planetsEnabled=!0;highContrastEnabled=!1;cursorEl=null;gestureLabel=null;lastPinchState=!1;setBridge(e){this.bridge=e}build(e){this.el=document.createElement("div"),this.el.className="mode-overlay panel-overlay hidden",this.el.innerHTML=`
      <div class="mode-header">
        <span class="mode-icon">🎛️</span>
        <div>
          <div class="mode-title">TOUCHLESS HARDWARE & SYSTEM CONSOLE</div>
          <div class="mode-sub">Real Working Controls • Point to Aim • Pinch / Drag Sliders • No Touch Required</div>
        </div>
        <div class="panel-gesture-label" id="panel-gesture">STANDBY</div>
      </div>

      <div class="panel-body">

        <!-- REAL SLIDERS SECTION -->
        <div class="panel-card panel-sliders-card">
          <div class="rehab-card-title">ANALOG TOUCHLESS SLIDERS</div>

          <!-- VOLUME SLIDER -->
          <div class="real-control-group" data-slider="volume">
            <div class="control-header">
              <span class="ctrl-icon">🔊</span>
              <span class="ctrl-title">MASTER AUDIO VOLUME</span>
              <span class="ctrl-value" id="val-volume">80%</span>
            </div>
            <div class="air-slider-track" id="track-volume">
              <div class="air-slider-fill" id="fill-volume" style="width: 80%"></div>
              <div class="air-slider-thumb" id="thumb-volume" style="left: 80%"></div>
            </div>
          </div>

          <!-- BRIGHTNESS SLIDER -->
          <div class="real-control-group" data-slider="brightness">
            <div class="control-header">
              <span class="ctrl-icon">☀️</span>
              <span class="ctrl-title">HUD & DISPLAY BRIGHTNESS</span>
              <span class="ctrl-value" id="val-brightness">100%</span>
            </div>
            <div class="air-slider-track" id="track-brightness">
              <div class="air-slider-fill" id="fill-brightness" style="width: 50%"></div>
              <div class="air-slider-thumb" id="thumb-brightness" style="left: 50%"></div>
            </div>
          </div>

          <!-- ORBIT SPEED SLIDER -->
          <div class="real-control-group" data-slider="orbitspeed">
            <div class="control-header">
              <span class="ctrl-icon">🪐</span>
              <span class="ctrl-title">CELESTIAL ORBIT SPEED</span>
              <span class="ctrl-value" id="val-orbitspeed">1.0x</span>
            </div>
            <div class="air-slider-track" id="track-orbitspeed">
              <div class="air-slider-fill" id="fill-orbitspeed" style="width: 20%"></div>
              <div class="air-slider-thumb" id="thumb-orbitspeed" style="left: 20%"></div>
            </div>
            <div class="slider-marks"><span>0.0x (FREEZE)</span><span>1.0x (NORMAL)</span><span>5.0x (WARP)</span></div>
          </div>

          <!-- CAMERA ZOOM SLIDER -->
          <div class="real-control-group" data-slider="camzoom">
            <div class="control-header">
              <span class="ctrl-icon">🔭</span>
              <span class="ctrl-title">3D CAMERA DISTANCE</span>
              <span class="ctrl-value" id="val-camzoom">50%</span>
            </div>
            <div class="air-slider-track" id="track-camzoom">
              <div class="air-slider-fill" id="fill-camzoom" style="width: 50%"></div>
              <div class="air-slider-thumb" id="thumb-camzoom" style="left: 50%"></div>
            </div>
            <div class="slider-marks"><span>CLOSE FOCUS</span><span>DEFAULT</span><span>DEEP FIELD</span></div>
          </div>

        </div>

        <!-- REAL ACTION BUTTONS & TOGGLES -->
        <div class="panel-card panel-actions-card">
          <div class="rehab-card-title">TACTILE SYSTEM SWITCHES</div>

          <div class="real-switches-grid">
            <button class="real-switch-btn" id="ctrl-btn-fullscreen">
              <span class="switch-icon">⛶</span>
              <div class="switch-text">
                <span class="switch-name">FULLSCREEN</span>
                <span class="switch-state" id="state-fullscreen">WINDOWED</span>
              </div>
            </button>

            <button class="real-switch-btn active" id="ctrl-btn-sound">
              <span class="switch-icon">🔔</span>
              <div class="switch-text">
                <span class="switch-name">AUDIO SYNTH</span>
                <span class="switch-state" id="state-sound">ACTIVE</span>
              </div>
            </button>

            <button class="real-switch-btn active" id="ctrl-btn-planets">
              <span class="switch-icon">🌌</span>
              <div class="switch-text">
                <span class="switch-name">9 PLANETS</span>
                <span class="switch-state" id="state-planets">ORBITING</span>
              </div>
            </button>

            <button class="real-switch-btn" id="ctrl-btn-topview">
              <span class="switch-icon">🧭</span>
              <div class="switch-text">
                <span class="switch-name">TOP VIEW</span>
                <span class="switch-state">ALIGN CAMERA</span>
              </div>
            </button>

            <button class="real-switch-btn" id="ctrl-btn-resetview">
              <span class="switch-icon">🎯</span>
              <div class="switch-text">
                <span class="switch-name">RESET VIEW</span>
                <span class="switch-state">DEFAULT ORBIT</span>
              </div>
            </button>

            <button class="real-switch-btn" id="ctrl-btn-contrast">
              <span class="switch-icon">⚡</span>
              <div class="switch-text">
                <span class="switch-name">HIGH CONTRAST</span>
                <span class="switch-state" id="state-contrast">NORMAL</span>
              </div>
            </button>
          </div>

          <div class="rehab-card-title" style="margin-top:1.2rem">REAL-TIME SYSTEM TELEMETRY</div>
          <div class="panel-telemetry" id="panel-telemetry">
            <div>STATUS: <span style="color:#2ff3ff">TOUCHLESS BUS ONLINE</span></div>
            <div>FPS: <span id="tele-fps">60 FPS</span></div>
            <div>GESTURE INPUT: <span id="tele-input" style="color:#2ff3ff">INDEX POINTER</span></div>
            <div>AUDIO BUS: <span id="tele-audio">ACTIVE (GAIN 0.8)</span></div>
          </div>

          <div class="rehab-card-title" style="margin-top:1rem">GESTURE MANUAL</div>
          <div class="panel-hint">👉 <b>POINT</b> at any slider track to adjust value touchlessly</div>
          <div class="panel-hint">🤌 <b>PINCH</b> on any switch button to toggle ON/OFF</div>
          <div class="panel-hint">🖱️ <b>CLICK & DRAG</b> also fully supported as fallback</div>
        </div>

      </div>

      <div class="panel-cursor" id="panel-cursor"></div>
    `,e.append(this.el),this.gestureLabel=this.el.querySelector("#panel-gesture"),this.cursorEl=this.el.querySelector("#panel-cursor"),this.setupListeners()}setupListeners(){if(!this.el)return;this.el.querySelector("#ctrl-btn-fullscreen")?.addEventListener("click",()=>{this.toggleFullscreen()}),this.el.querySelector("#ctrl-btn-sound")?.addEventListener("click",()=>{this.toggleSound()}),this.el.querySelector("#ctrl-btn-planets")?.addEventListener("click",()=>{this.togglePlanets()}),this.el.querySelector("#ctrl-btn-topview")?.addEventListener("click",()=>{this.bridge?.setTopView()}),this.el.querySelector("#ctrl-btn-resetview")?.addEventListener("click",()=>{this.bridge?.resetView()}),this.el.querySelector("#ctrl-btn-contrast")?.addEventListener("click",()=>{this.toggleContrast()});const e=(t,i)=>{const n=this.el?.querySelector(`#track-${t}`);if(!n)return;const r=a=>{const o=n.getBoundingClientRect(),l=Math.max(0,Math.min(o.width,a.clientX-o.left))/o.width;i(l)};n.addEventListener("mousedown",a=>{r(a);const o=l=>r(l),c=()=>{window.removeEventListener("mousemove",o),window.removeEventListener("mouseup",c)};window.addEventListener("mousemove",o),window.addEventListener("mouseup",c)})};e("volume",t=>this.setVolume(t)),e("brightness",t=>this.setBrightness(.5+t*1)),e("orbitspeed",t=>this.setOrbitSpeed(t*5)),e("camzoom",t=>this.setCameraZoom(t))}setVolume(e){this.volume=Math.max(0,Math.min(1,e));const t=this.el?.querySelector("#fill-volume"),i=this.el?.querySelector("#thumb-volume"),n=this.el?.querySelector("#val-volume"),r=Math.round(this.volume*100);t&&(t.style.width=`${r}%`),i&&(i.style.left=`${r}%`),n&&(n.textContent=`${r}%`),this.bridge?.setMasterVolume(this.volume);const a=this.el?.querySelector("#tele-audio");a&&(a.textContent=`ACTIVE (GAIN ${this.volume.toFixed(2)})`)}setBrightness(e){this.brightness=Math.max(.5,Math.min(1.5,e));const t=(this.brightness-.5)/1,i=this.el?.querySelector("#fill-brightness"),n=this.el?.querySelector("#thumb-brightness"),r=this.el?.querySelector("#val-brightness");i&&(i.style.width=`${(t*100).toFixed(0)}%`),n&&(n.style.left=`${(t*100).toFixed(0)}%`),r&&(r.textContent=`${Math.round(this.brightness*100)}%`),this.bridge?.setDisplayBrightness(this.brightness)}setOrbitSpeed(e){this.orbitSpeed=Math.max(0,Math.min(5,e));const t=this.orbitSpeed/5*100,i=this.el?.querySelector("#fill-orbitspeed"),n=this.el?.querySelector("#thumb-orbitspeed"),r=this.el?.querySelector("#val-orbitspeed");i&&(i.style.width=`${t.toFixed(0)}%`),n&&(n.style.left=`${t.toFixed(0)}%`),r&&(r.textContent=`${this.orbitSpeed.toFixed(1)}x`),this.bridge?.setOrbitSpeed(this.orbitSpeed)}setCameraZoom(e){this.cameraDistance=Math.max(0,Math.min(1,e));const t=this.el?.querySelector("#fill-camzoom"),i=this.el?.querySelector("#thumb-camzoom"),n=this.el?.querySelector("#val-camzoom"),r=Math.round(this.cameraDistance*100);t&&(t.style.width=`${r}%`),i&&(i.style.left=`${r}%`),n&&(n.textContent=`${r}%`),this.bridge?.setCameraDistance(this.cameraDistance)}toggleFullscreen(){document.fullscreenElement?(document.exitFullscreen().catch(()=>{}),this.updateSwitchState("fullscreen",!1,"WINDOWED")):(document.documentElement.requestFullscreen().catch(()=>{}),this.updateSwitchState("fullscreen",!0,"FULLSCREEN"))}toggleSound(){this.soundEnabled=!this.soundEnabled,this.bridge?.toggleSound(),this.updateSwitchState("sound",this.soundEnabled,this.soundEnabled?"ACTIVE":"MUTED")}togglePlanets(){this.bridge&&(this.planetsEnabled=this.bridge.togglePlanets(),this.updateSwitchState("planets",this.planetsEnabled,this.planetsEnabled?"ORBITING":"HIDDEN"))}toggleContrast(){this.bridge&&(this.highContrastEnabled=this.bridge.toggleHighContrast(),this.updateSwitchState("contrast",this.highContrastEnabled,this.highContrastEnabled?"ACTIVE":"NORMAL"))}updateSwitchState(e,t,i){const n=this.el?.querySelector(`#ctrl-btn-${e}`),r=this.el?.querySelector(`#state-${e}`);n&&n.classList.toggle("active",t),r&&(r.textContent=i)}update(e,t){if(!this.visible||!this.el)return;const i=t.find(h=>h.active);if(!i){this.gestureLabel&&(this.gestureLabel.textContent="STANDBY — NO HAND"),this.cursorEl&&(this.cursorEl.style.opacity="0");return}this.gestureLabel&&(this.gestureLabel.textContent=`TOUCHLESS INPUT: ${i.gesture}`);const n=(i.indexTip?.x??i.palm?.x??.5)*window.innerWidth,r=(i.indexTip?.y??i.palm?.y??.5)*window.innerHeight;this.cursorEl&&(this.cursorEl.style.opacity="1",this.cursorEl.style.left=`${n}px`,this.cursorEl.style.top=`${r}px`);const a=i.pinching||i.gesture==="PINCH",o=i.gesture==="POINT";this.el.querySelectorAll(".real-control-group").forEach(h=>{const p=h.getAttribute("data-slider"),u=h.querySelector(".air-slider-track");if(!u||!p)return;const m=u.getBoundingClientRect();if(n>=m.left-15&&n<=m.right+15&&r>=m.top-20&&r<=m.bottom+20){if(u.classList.add("hovered"),o||a){const x=Math.max(0,Math.min(1,(n-m.left)/m.width));p==="volume"?this.setVolume(x):p==="brightness"?this.setBrightness(.5+x*1):p==="orbitspeed"?this.setOrbitSpeed(x*5):p==="camzoom"&&this.setCameraZoom(x)}}else u.classList.remove("hovered")}),this.el.querySelectorAll(".real-switch-btn").forEach(h=>{const p=h.getBoundingClientRect();n>=p.left&&n<=p.right&&r>=p.top&&r<=p.bottom?(h.classList.add("hovered"),a&&!this.lastPinchState&&(h.click(),h.classList.add("activated"),setTimeout(()=>h.classList.remove("activated"),300))):h.classList.remove("hovered")}),this.lastPinchState=a}setVisible(e){this.visible=e,this.el?.classList.toggle("hidden",!e)}dispose(){this.el?.remove()}}const Ha=[{id:"normal",label:"NORMAL",css:"none"},{id:"cyber",label:"CYBER CYAN",css:"hue-rotate(170deg) contrast(1.25) saturate(1.4)"},{id:"neon",label:"NEON MATRIX",css:"contrast(1.4) saturate(1.8) brightness(1.05)"},{id:"noir",label:"MONO NOIR",css:"grayscale(1) contrast(1.5) brightness(0.95)"},{id:"golden",label:"GOLDEN HOUR",css:"sepia(0.4) saturate(1.5) brightness(1.05)"}];class Zv{el=null;visible=!1;bridge=null;countdownActive=!1;countdownSeconds=3;countdownTimer=null;activeFilter="normal";showGrid=!0;showWatermark=!0;photos=[];lastTriggerTime=0;palmHoldDuration=0;peaceHoldDuration=0;audioCtx=null;videoPreview=null;fallbackCanvas=null;countdownEl=null;flashOverlay=null;galleryEl=null;filterSelectEl=null;gestureBadgeEl=null;setBridge(e){this.bridge=e}build(e){this.el=document.createElement("div"),this.el.className="mode-overlay photo-overlay hidden",this.el.innerHTML=`
      <div class="mode-header">
        <span class="mode-icon">📸</span>
        <div>
          <div class="mode-title">TOUCHLESS AIR-SHUTTER PHOTO STUDIO</div>
          <div class="mode-sub">Show Open Palm 🖐️ for 3s timer • Peace Sign ✌️ for instant snap • Instant photo download</div>
        </div>
        <div class="photo-status-badge" id="photo-status-badge">CAMERA READY</div>
      </div>

      <div class="photo-studio-grid">

        <!-- VIEWFINDER CONTAINER -->
        <div class="viewfinder-wrapper">
          <div class="viewfinder-frame" id="viewfinder-frame">
            <!-- Live video feed element -->
            <video class="viewfinder-video" id="studio-video" autoplay playsinline muted></video>
            
            <!-- Fallback canvas when video not active -->
            <canvas class="viewfinder-canvas" id="studio-canvas" style="display:none;"></canvas>

            <!-- Sci-Fi Camera HUD Overlay -->
            <div class="camera-hud-overlay">
              <div class="hud-corner top-left"></div>
              <div class="hud-corner top-right"></div>
              <div class="hud-corner bottom-left"></div>
              <div class="hud-corner bottom-right"></div>

              <div class="hud-reticle-center">+</div>

              <div class="hud-grid-lines" id="hud-grid-lines">
                <div class="grid-line horizontal-1"></div>
                <div class="grid-line horizontal-2"></div>
                <div class="grid-line vertical-1"></div>
                <div class="grid-line vertical-2"></div>
              </div>

              <!-- Live Shutter Gesture Indicator Overlay -->
              <div class="gesture-hud-badge" id="gesture-hud-badge">
                🖐️ SHOW OPEN PALM TO START 3s COUNTDOWN
              </div>

              <!-- Large Radial Countdown Overlay -->
              <div class="shutter-countdown-box" id="shutter-countdown" style="display:none;">
                <div class="countdown-number" id="countdown-number">3</div>
                <div class="countdown-sub">HOLD POSE...</div>
              </div>

              <!-- Fullscreen Flash Overlay -->
              <div class="camera-flash" id="camera-flash"></div>
            </div>
          </div>

          <!-- VIEWFINDER CONTROLS BAR -->
          <div class="viewfinder-toolbar">
            <div class="tb-group">
              <button class="studio-btn primary-snap-btn" id="btn-snap-now">
                <span class="btn-icon">📸</span> SNAP PHOTO
              </button>
              <button class="studio-btn timer-btn" id="btn-snap-timer">
                <span class="btn-icon">⏱️</span> 3S TIMER
              </button>
              <button class="studio-btn" id="btn-toggle-cam">
                <span class="btn-icon">🎥</span> TOGGLE CAMERA
              </button>
            </div>

            <div class="tb-group">
              <span class="tb-label">FILTER:</span>
              <select class="studio-select" id="studio-filter-select">
                ${Ha.map(t=>`<option value="${t.id}">${t.label}</option>`).join("")}
              </select>
              <button class="studio-btn" id="btn-toggle-grid">📐 GRID</button>
              <button class="studio-btn" id="btn-toggle-watermark">🏷️ WATERMARK</button>
            </div>
          </div>
        </div>

        <!-- CAPTURED PHOTOS REEL / GALLERY -->
        <div class="photo-gallery-panel">
          <div class="gallery-header">
            <div class="gallery-title">
              <span>🎞️ CAPTURED SHOTS</span>
              <span class="photo-count-badge" id="photo-count-badge">0 PHOTOS</span>
            </div>
            <div class="gallery-actions">
              <button class="studio-btn small-btn" id="btn-download-all">⬇️ DOWNLOAD ALL</button>
              <button class="studio-btn small-btn danger-btn" id="btn-clear-gallery">🧹 CLEAR</button>
            </div>
          </div>

          <div class="photos-filmstrip" id="photos-filmstrip">
            <div class="empty-gallery-notice" id="empty-gallery-notice">
              <div class="empty-icon">📷</div>
              <div class="empty-text">No photos snapped yet.</div>
              <div class="empty-sub">Raise your hand in the air or click SNAP PHOTO!</div>
            </div>
          </div>
        </div>

      </div>
    `,e.append(this.el),this.videoPreview=this.el.querySelector("#studio-video"),this.fallbackCanvas=this.el.querySelector("#studio-canvas"),this.countdownEl=this.el.querySelector("#shutter-countdown"),this.flashOverlay=this.el.querySelector("#camera-flash"),this.galleryEl=this.el.querySelector("#photos-filmstrip"),this.filterSelectEl=this.el.querySelector("#studio-filter-select"),this.gestureBadgeEl=this.el.querySelector("#gesture-hud-badge"),this.setupListeners()}setupListeners(){if(!this.el)return;this.el.querySelector("#btn-snap-now")?.addEventListener("click",()=>{this.triggerSnapshot()}),this.el.querySelector("#btn-snap-timer")?.addEventListener("click",()=>{this.startCountdown(3)}),this.el.querySelector("#btn-toggle-cam")?.addEventListener("click",()=>{this.bridge&&this.bridge.toggleCamera().then(()=>this.syncVideoFeed())}),this.filterSelectEl?.addEventListener("change",()=>{this.setFilter(this.filterSelectEl?.value)}),this.el.querySelector("#btn-toggle-grid")?.addEventListener("click",()=>{this.showGrid=!this.showGrid;const i=this.el?.querySelector("#hud-grid-lines");i&&(i.style.display=this.showGrid?"block":"none");const n=this.el?.querySelector("#btn-toggle-grid");n&&n.classList.toggle("active",this.showGrid)}),this.el.querySelector("#btn-toggle-watermark")?.addEventListener("click",()=>{this.showWatermark=!this.showWatermark;const i=this.el?.querySelector("#btn-toggle-watermark");i&&i.classList.toggle("active",this.showWatermark)}),this.el.querySelector("#btn-download-all")?.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation(),this.downloadAllPhotos()}),this.el.querySelector("#btn-clear-gallery")?.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation(),this.photos=[],this.renderGallery()})}initAudio(){if(!this.audioCtx){const e=window.AudioContext||window.webkitAudioContext;this.audioCtx=new e}this.audioCtx.state==="suspended"&&this.audioCtx.resume()}playTone(e,t,i="sine"){try{if(this.initAudio(),!this.audioCtx)return;const n=this.audioCtx.createOscillator(),r=this.audioCtx.createGain();n.type=i,n.frequency.setValueAtTime(e,this.audioCtx.currentTime),r.gain.setValueAtTime(.2,this.audioCtx.currentTime),r.gain.exponentialRampToValueAtTime(.001,this.audioCtx.currentTime+t),n.connect(r),r.connect(this.audioCtx.destination),n.start(),n.stop(this.audioCtx.currentTime+t)}catch{}}playShutterSound(){try{if(this.initAudio(),!this.audioCtx)return;const e=this.audioCtx.currentTime,t=this.audioCtx.createOscillator(),i=this.audioCtx.createGain();t.type="triangle",t.frequency.setValueAtTime(1400,e),t.frequency.exponentialRampToValueAtTime(300,e+.08),i.gain.setValueAtTime(.35,e),i.gain.exponentialRampToValueAtTime(.001,e+.08),t.connect(i),i.connect(this.audioCtx.destination),t.start(e),t.stop(e+.08),setTimeout(()=>{if(!this.audioCtx)return;const n=this.audioCtx.currentTime,r=this.audioCtx.createOscillator(),a=this.audioCtx.createGain();r.type="square",r.frequency.setValueAtTime(440,n),r.frequency.exponentialRampToValueAtTime(100,n+.12),a.gain.setValueAtTime(.25,n),a.gain.exponentialRampToValueAtTime(.001,n+.12),r.connect(a),a.connect(this.audioCtx.destination),r.start(n),r.stop(n+.12)},60)}catch{}}setFilter(e){this.activeFilter=e;const t=Ha.find(i=>i.id===e);!t||!this.videoPreview||(this.videoPreview.style.filter=t.css,this.filterSelectEl&&(this.filterSelectEl.value=e))}syncVideoFeed(){const e=this.bridge?.getVideoElement();if(e&&e.srcObject&&this.videoPreview){this.videoPreview.srcObject=e.srcObject,this.videoPreview.style.display="block",this.fallbackCanvas&&(this.fallbackCanvas.style.display="none");const t=this.el?.querySelector("#photo-status-badge");t&&(t.textContent="OPTICAL FEED LIVE",t.classList.add("live"))}else{this.videoPreview&&(this.videoPreview.style.display="none"),this.fallbackCanvas&&(this.fallbackCanvas.style.display="block");const t=this.el?.querySelector("#photo-status-badge");t&&(t.textContent="CAMERA OFF — CLICK TOGGLE CAMERA",t.classList.remove("live"))}}startCountdown(e=3){if(this.countdownActive)return;this.countdownActive=!0,this.countdownSeconds=e,this.countdownEl&&(this.countdownEl.style.display="flex");const t=this.el?.querySelector("#countdown-number");t&&(t.textContent=String(this.countdownSeconds)),this.playTone(880,.18,"sine"),this.countdownTimer&&clearInterval(this.countdownTimer),this.countdownTimer=window.setInterval(()=>{this.countdownSeconds--,this.countdownSeconds>0?(t&&(t.textContent=String(this.countdownSeconds)),this.playTone(880,.18,"sine")):(clearInterval(this.countdownTimer),this.countdownTimer=null,this.countdownActive=!1,this.countdownEl&&(this.countdownEl.style.display="none"),this.playTone(1760,.25,"sine"),this.triggerSnapshot())},1e3)}cancelCountdown(){this.countdownActive&&(this.countdownActive=!1,this.countdownTimer&&(clearInterval(this.countdownTimer),this.countdownTimer=null),this.countdownEl&&(this.countdownEl.style.display="none"),this.playTone(330,.15,"sawtooth"))}triggerSnapshot(){this.flashOverlay&&(this.flashOverlay.classList.remove("active"),this.flashOverlay.offsetWidth,this.flashOverlay.classList.add("active")),this.playShutterSound();const e=this.bridge?.getVideoElement(),t=this.bridge?.getCanvasElement(),i=document.createElement("canvas"),n=i.getContext("2d");if(!n)return;if(e&&e.videoWidth>0&&e.videoHeight>0){i.width=e.videoWidth,i.height=e.videoHeight;const o=Ha.find(c=>c.id===this.activeFilter);o&&o.css!=="none"&&(n.filter=o.css),n.save(),n.translate(i.width,0),n.scale(-1,1),n.drawImage(e,0,0,i.width,i.height),n.restore()}else t?(i.width=t.width,i.height=t.height,n.drawImage(t,0,0)):(i.width=1280,i.height=720,n.fillStyle="#061325",n.fillRect(0,0,1280,720));if(this.showWatermark){n.filter="none";const o=new Date,c=o.toISOString().slice(0,10),l=o.toTimeString().slice(0,8),h=i.width,p=i.height;n.fillStyle="rgba(0, 8, 20, 0.75)",n.fillRect(h-380,p-56,360,42),n.strokeStyle="rgba(0, 229, 255, 0.6)",n.lineWidth=1.5,n.strokeRect(h-380,p-56,360,42),n.fillStyle="#00e5ff",n.font='bold 15px "Courier New", monospace',n.fillText("BRAHMASTRA AI • AIR SHUTTER",h-365,p-35),n.fillStyle="#ffb340",n.font='12px "Courier New", monospace',n.fillText(`${c} ${l}`,h-365,p-20)}const r=i.toDataURL("image/png"),a={id:`snap_${Date.now()}`,dataUrl:r,timestamp:new Date().toLocaleTimeString(),filter:this.activeFilter.toUpperCase()};this.photos.unshift(a),this.renderGallery()}renderGallery(){if(!this.galleryEl)return;const e=this.el?.querySelector("#photo-count-badge");if(e&&(e.textContent=`${this.photos.length} PHOTOS`),this.photos.length===0){this.galleryEl.innerHTML=`
        <div class="empty-gallery-notice" id="empty-gallery-notice">
          <div class="empty-icon">📷</div>
          <div class="empty-text">No photos snapped yet.</div>
          <div class="empty-sub">Raise your hand in the air or click SNAP PHOTO!</div>
        </div>
      `;return}this.galleryEl.innerHTML=this.photos.map(t=>`
      <div class="photo-card" data-id="${t.id}">
        <img class="photo-thumb" src="${t.dataUrl}" alt="Snapshot at ${t.timestamp}" />
        <div class="photo-info-bar">
          <span class="photo-time">${t.timestamp}</span>
          <span class="photo-filter-tag">${t.filter}</span>
        </div>
        <div class="photo-overlay-actions">
          <button class="photo-action-btn download-btn" data-download-id="${t.id}" title="Download Photo">
            ⬇️
          </button>
          <button class="photo-action-btn delete-btn" data-delete-id="${t.id}" title="Delete Photo">
            🗑️
          </button>
        </div>
      </div>
    `).join(""),this.galleryEl.querySelectorAll(".download-btn").forEach(t=>{t.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation();const n=i.currentTarget.getAttribute("data-download-id"),r=this.photos.find(a=>a.id===n);r&&this.downloadPhoto(r)})}),this.galleryEl.querySelectorAll(".delete-btn").forEach(t=>{t.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation();const n=i.currentTarget.getAttribute("data-delete-id");n&&(this.photos=this.photos.filter(r=>r.id!==n),this.renderGallery())})})}downloadPhoto(e){try{const t=document.createElement("a");t.style.display="none",t.href=e.dataUrl,t.download=`brahmastra_${e.id}.png`,document.body.appendChild(t),t.click(),setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},200)}catch(t){console.error("Photo download failed:",t)}}downloadAllPhotos(){if(this.photos.length===0)return;const e=this.el?.querySelector("#btn-download-all"),t=e?.textContent??"⬇️ DOWNLOAD ALL";e&&(e.textContent="⏳ DOWNLOADING..."),this.photos.forEach((i,n)=>{setTimeout(()=>{this.downloadPhoto(i),n===this.photos.length-1&&e&&setTimeout(()=>{e.textContent="✅ SAVED ALL!",setTimeout(()=>{e&&(e.textContent=t)},1200)},300)},n*250)})}update(e,t){if(!this.visible||!this.el)return;this.videoPreview&&!this.videoPreview.srcObject&&this.syncVideoFeed();const i=t.find(c=>c.active),n=performance.now();if(!i){this.palmHoldDuration=0,this.peaceHoldDuration=0,this.gestureBadgeEl&&(this.gestureBadgeEl.textContent="🖐️ SHOW OPEN PALM TO START 3s COUNTDOWN",this.gestureBadgeEl.classList.remove("active"));return}const r=i.gesture==="OPEN_PALM"||i.extendedCount>=4,a=i.gesture==="TWO_FINGER"||i.extension[1]>.7&&i.extension[2]>.7&&i.extension[3]<.3&&i.extension[4]<.3;if((i.gesture==="FIST"||i.extendedCount===0)&&this.countdownActive){this.cancelCountdown(),this.gestureBadgeEl&&(this.gestureBadgeEl.textContent="✊ FIST DETECTED — COUNTDOWN CANCELLED");return}if(a){this.peaceHoldDuration+=e,this.gestureBadgeEl&&(this.gestureBadgeEl.textContent="✌️ PEACE SIGN DETECTED — INSTANT SHUTTER!",this.gestureBadgeEl.classList.add("active")),this.peaceHoldDuration>=.4&&n-this.lastTriggerTime>2e3&&(this.lastTriggerTime=n,this.peaceHoldDuration=0,this.triggerSnapshot());return}else this.peaceHoldDuration=0;r&&!this.countdownActive?(this.palmHoldDuration+=e,this.gestureBadgeEl&&(this.gestureBadgeEl.textContent="🖐️ OPEN PALM DETECTED — HOLD FOR TIMER...",this.gestureBadgeEl.classList.add("active")),this.palmHoldDuration>=.5&&n-this.lastTriggerTime>2500&&(this.lastTriggerTime=n,this.palmHoldDuration=0,this.startCountdown(3))):this.countdownActive||(this.palmHoldDuration=0,this.gestureBadgeEl&&(this.gestureBadgeEl.textContent="🖐️ SHOW OPEN PALM FOR 3s TIMER • ✌️ PEACE FOR INSTANT SNAP",this.gestureBadgeEl.classList.remove("active")))}setVisible(e){this.visible=e,this.el?.classList.toggle("hidden",!e),e?this.syncVideoFeed():this.cancelCountdown()}dispose(){this.countdownTimer&&clearInterval(this.countdownTimer),this.audioCtx&&this.audioCtx.close(),this.el?.remove()}}const As=[{title:"BRAHMASTRA AI",tagline:"Autonomous Spatial Intelligence & Touchless Vision Platform",badges:["KEYNOTE 2026","PHYSICAL AI","ZERO HARDWARE"],bullets:[{icon:"🪐",title:"Celestial Neural Core",desc:"Central neural sphere orchestrating real-time 9-planet celestial physics and spatial shaders."},{icon:"👁️",title:"Browser-Native Computer Vision",desc:"Runs 100% locally in browser at 60+ FPS on any standard webcam without cloud latency."},{icon:"🖐️",title:"21 3D Anatomical Landmarks",desc:"Sub-millimeter tracking of joints, palm roll, finger extension, and spatial gestures."}],speakerNotes:"Welcome the audience. Introduce Brahmastra AI as a breakthrough in browser-based spatial computing requiring zero extra sensors."},{title:"NEURAL PIPELINE & ARCHITECTURE",tagline:"How Brahmastra AI Processes Reality in Milliseconds",badges:["ARCHITECTURE","TENSORFLOW","WEBGL"],bullets:[{icon:"📷",title:"Webcam Stream Demuxer",desc:"High-throughput frame ingestion with hardware accelerated OffscreenCanvas."},{icon:"⚡",title:"Gesture State Machine",desc:"Deterministic debounce filters that convert raw landmarks into intentional actions."},{icon:"🎨",title:"Three.js Post-Processing",desc:"Custom GLSL bloom, chromatic aberration, and holographic HUD overlays."}],speakerNotes:"Walk through the 3 layers: camera ingestion, neural gesture state machine, and GPU-accelerated rendering."},{title:"REAL-WORLD PHYSICAL APPLICATIONS",tagline:"Beyond Gimmicks: 4 Concrete Life-Saving Solutions",badges:["HEALTHCARE","INDUSTRY","ACCESSIBILITY"],bullets:[{icon:"🏥",title:"Clinic Hand Rehabilitation",desc:"1-Minute cadence drills, extension meters, and range-of-motion recovery without hardware."},{icon:"🎛️",title:"Touchless Cleanroom Console",desc:"Sterile surgical, chemical lab, and factory control where screens cannot be touched."},{icon:"📓",title:"Air-Notebook & Speech Voice",desc:"Write in mid-air with your hand and pronounce words out loud through speech synthesis."}],speakerNotes:"Emphasize that this is built for practical, impactful scenarios: clinics, sterile operating rooms, assistive writing, and stage keynotes."},{title:"ZERO-HARDWARE REVOLUTION",tagline:"Why Touchless Accessibility Must Be Hardware-Free",badges:["ACCESSIBILITY","COST: $0","EVERY DEVICE"],bullets:[{icon:"💻",title:"Zero VR Headsets Required",desc:"No bulky $3,500 goggles, gloves, or fragile infrared sensors."},{icon:"🔒",title:"100% Privacy Preserving",desc:"No video stream ever leaves the client machine; inference runs on WebAssembly."},{icon:"🌍",title:"Instant Worldwide Distribution",desc:"Open a URL in Chrome/Edge and start interacting immediately."}],speakerNotes:"Explain the democratizing power: any school, clinic, or presenter with an ordinary webcam can use this immediately."},{title:"THE FUTURE OF HUMAN-MACHINE SYMBIOSIS",tagline:"Where Touchless AI Is Heading Next",badges:["ROADMAP","MILESTONES","LIVE DEMO"],bullets:[{icon:"🚀",title:"Multi-User Spatial Collaboration",desc:"Simultaneous multi-hand interaction across shared spatial environments."},{icon:"🧠",title:"Intent Prediction Models",desc:"Anticipatory trajectory smoothing for effortless micro-gestures."},{icon:"✨",title:"Live Demonstration",desc:"Try out the air laser pointer, spotlight, and handwriting modes right now!"}],speakerNotes:"Conclude the presentation, thank the audience, and invite questions while pointing out the live air laser controls."}];class Jv{el=null;visible=!1;currentSlideIndex=0;isLaserActive=!0;isSpotlightActive=!1;isBlackout=!1;isNotesOpen=!1;timerSeconds=0;timerRunning=!0;slideCard=null;slideTitle=null;slideTagline=null;slideBadges=null;slideBullets=null;slideCounter=null;progressBar=null;timerDisplay=null;notesContent=null;notesDrawer=null;blackoutOverlay=null;laserPointer=null;spotlightMask=null;swipeCooldown=0;build(e){this.el=document.createElement("div"),this.el.className="mode-overlay slides-overlay hidden",this.el.innerHTML=`
      <div class="mode-header">
        <span class="mode-icon">🎤</span>
        <div>
          <div class="mode-title">STAGE & MEETING PRESENTATION CONTROLLER</div>
          <div class="mode-sub">Air Laser Pointer • Stage Spotlight • Hand Swipe Navigation • Blackout Attention Pause</div>
        </div>
        <div class="presenter-meeting-timer" id="pres-timer">⏱️ 00:00 (ON TIME)</div>
      </div>

      <!-- MAIN STAGE PRESENTATION SCREEN -->
      <div class="presentation-stage">

        <!-- FLOATING PRESENTER TOOLBAR -->
        <div class="pres-toolbar">
          <button class="pres-tool-btn active" id="tool-laser">🔴 AIR LASER</button>
          <button class="pres-tool-btn" id="tool-spotlight">🔦 SPOTLIGHT</button>
          <button class="pres-tool-btn" id="tool-blackout">⬛ BLACKOUT SCREEN</button>
          <button class="pres-tool-btn" id="tool-notes">📋 SPEAKER NOTES</button>
          <button class="pres-tool-btn" id="tool-timer-reset">↺ RESET TIMER</button>
        </div>

        <!-- SLIDE VIEWER CONTAINER -->
        <div class="slide-view-container" id="slide-container">
          
          <div class="slide-card" id="pres-slide-card">
            
            <div class="slide-top-row">
              <div class="slide-badges" id="slide-badges"></div>
              <div class="slide-number-pill" id="slide-number-pill">SLIDE 1 / 5</div>
            </div>

            <h1 class="slide-main-title" id="slide-title">BRAHMASTRA AI</h1>
            <p class="slide-main-tagline" id="slide-tagline">Autonomous Spatial Intelligence Platform</p>

            <div class="slide-bullets-grid" id="slide-bullets"></div>

          </div>

          <!-- SPOTLIGHT VIGNETTE OVERLAY -->
          <div class="spotlight-overlay" id="pres-spotlight" style="display:none"></div>

          <!-- AIR LASER POINTER -->
          <div class="air-laser-dot" id="pres-laser">
            <div class="laser-core"></div>
            <div class="laser-flare"></div>
          </div>

        </div>

        <!-- BOTTOM STAGE CONTROLS & PROGRESS -->
        <div class="pres-bottom-bar">
          <button class="pres-nav-arrow" id="pres-prev-btn">◀ PREVIOUS (SWIPE LEFT)</button>
          
          <div class="pres-dots-row" id="pres-dots"></div>

          <div class="pres-progress-track">
            <div class="pres-progress-fill" id="pres-progress-bar" style="width: 20%"></div>
          </div>

          <button class="pres-nav-arrow" id="pres-next-btn">NEXT (SWIPE RIGHT) ▶</button>
        </div>

      </div>

      <!-- SPEAKER TELEPROMPTER NOTES DRAWER -->
      <div class="speaker-notes-drawer" id="speaker-notes-drawer" style="display:none">
        <div class="notes-header">
          <span>📋 SPEAKER TELEPROMPTER NOTES</span>
          <button class="notes-close" id="notes-close">✕</button>
        </div>
        <div class="notes-body" id="notes-body"></div>
      </div>

      <!-- STAGE BLACKOUT OVERLAY -->
      <div class="stage-blackout-screen" id="stage-blackout" style="display:none">
        <div class="blackout-prompt">
          <div class="blackout-icon">⏸️</div>
          <div class="blackout-title">STAGE ATTENTION PAUSED</div>
          <div class="blackout-sub">Tap BLACKOUT or Open Hand to resume slide display</div>
        </div>
      </div>
    `,e.append(this.el),this.slideCard=this.el.querySelector("#pres-slide-card"),this.slideTitle=this.el.querySelector("#slide-title"),this.slideTagline=this.el.querySelector("#slide-tagline"),this.slideBadges=this.el.querySelector("#slide-badges"),this.slideBullets=this.el.querySelector("#slide-bullets"),this.slideCounter=this.el.querySelector("#slide-number-pill"),this.progressBar=this.el.querySelector("#pres-progress-bar"),this.timerDisplay=this.el.querySelector("#pres-timer"),this.notesDrawer=this.el.querySelector("#speaker-notes-drawer"),this.notesContent=this.el.querySelector("#notes-body"),this.blackoutOverlay=this.el.querySelector("#stage-blackout"),this.laserPointer=this.el.querySelector("#pres-laser"),this.spotlightMask=this.el.querySelector("#pres-spotlight"),this.setupListeners(),this.renderSlide(0)}setupListeners(){this.el&&(this.el.querySelector("#pres-prev-btn")?.addEventListener("click",()=>this.prevSlide()),this.el.querySelector("#pres-next-btn")?.addEventListener("click",()=>this.nextSlide()),this.el.querySelector("#tool-laser")?.addEventListener("click",e=>{this.isLaserActive=!this.isLaserActive,e.currentTarget.classList.toggle("active",this.isLaserActive)}),this.el.querySelector("#tool-spotlight")?.addEventListener("click",e=>{this.isSpotlightActive=!this.isSpotlightActive,e.currentTarget.classList.toggle("active",this.isSpotlightActive),this.spotlightMask&&(this.spotlightMask.style.display=this.isSpotlightActive?"block":"none")}),this.el.querySelector("#tool-blackout")?.addEventListener("click",()=>this.toggleBlackout()),this.blackoutOverlay?.addEventListener("click",()=>this.toggleBlackout()),this.el.querySelector("#tool-notes")?.addEventListener("click",e=>{this.isNotesOpen=!this.isNotesOpen,e.currentTarget.classList.toggle("active",this.isNotesOpen),this.notesDrawer&&(this.notesDrawer.style.display=this.isNotesOpen?"block":"none")}),this.el.querySelector("#notes-close")?.addEventListener("click",()=>{this.isNotesOpen=!1,this.el?.querySelector("#tool-notes")?.classList.remove("active"),this.notesDrawer&&(this.notesDrawer.style.display="none")}),this.el.querySelector("#tool-timer-reset")?.addEventListener("click",()=>{this.timerSeconds=0}),window.addEventListener("keydown",e=>{this.visible&&(e.key==="ArrowRight"||e.key==="PageDown"||e.key===" "?this.nextSlide():e.key==="ArrowLeft"||e.key==="PageUp"?this.prevSlide():(e.key==="b"||e.key==="B")&&this.toggleBlackout())}))}toggleBlackout(){this.isBlackout=!this.isBlackout,this.blackoutOverlay&&(this.blackoutOverlay.style.display=this.isBlackout?"flex":"none");const e=this.el?.querySelector("#tool-blackout");e&&e.classList.toggle("active",this.isBlackout)}nextSlide(){this.currentSlideIndex<As.length-1&&this.renderSlide(this.currentSlideIndex+1)}prevSlide(){this.currentSlideIndex>0&&this.renderSlide(this.currentSlideIndex-1)}renderSlide(e){this.currentSlideIndex=e;const t=As[e];if(!t)return;this.slideTitle&&(this.slideTitle.textContent=t.title),this.slideTagline&&(this.slideTagline.textContent=t.tagline),this.slideCounter&&(this.slideCounter.textContent=`SLIDE ${e+1} / ${As.length}`),this.slideBadges&&(this.slideBadges.innerHTML=t.badges.map(r=>`<span class="slide-badge">${r}</span>`).join("")),this.slideBullets&&(this.slideBullets.innerHTML=t.bullets.map(r=>`
          <div class="slide-bullet-item">
            <span class="bullet-icon">${r.icon}</span>
            <div class="bullet-content">
              <h3 class="bullet-title">${r.title}</h3>
              <p class="bullet-desc">${r.desc}</p>
            </div>
          </div>
        `).join(""));const i=(e+1)/As.length*100;this.progressBar&&(this.progressBar.style.width=`${i}%`),this.notesContent&&(this.notesContent.innerHTML=`
        <div class="notes-slide-title">SLIDE ${e+1}: ${t.title}</div>
        <p class="notes-text">${t.speakerNotes}</p>
      `);const n=this.el?.querySelector("#pres-dots");n&&(n.innerHTML=As.map((r,a)=>`
        <button class="pres-dot ${a===e?"active":""}" data-idx="${a}"></button>
      `).join(""),n.querySelectorAll(".pres-dot").forEach(r=>{r.addEventListener("click",()=>{const a=Number(r.getAttribute("data-idx"));this.renderSlide(a)})})),this.slideCard&&(this.slideCard.classList.remove("slide-enter"),this.slideCard.offsetWidth,this.slideCard.classList.add("slide-enter"))}update(e,t){if(!this.visible||!this.el)return;if(this.swipeCooldown=Math.max(0,this.swipeCooldown-e),this.timerRunning){this.timerSeconds+=e;const l=Math.floor(this.timerSeconds/60),h=Math.floor(this.timerSeconds%60),p=`${String(l).padStart(2,"0")}:${String(h).padStart(2,"0")}`;if(this.timerDisplay){const u=l<10?"ON TIME":l<15?"APPROACHING CONCLUSION":"WRAP UP";this.timerDisplay.textContent=`⏱️ ${p} (${u})`}}const i=t.find(l=>l.active);if(!i){this.laserPointer&&(this.laserPointer.style.opacity="0");return}const n=(i.indexTip?.x??i.palm?.x??.5)*window.innerWidth,r=(i.indexTip?.y??i.palm?.y??.5)*window.innerHeight;this.laserPointer&&(this.isLaserActive&&!this.isBlackout?(this.laserPointer.style.opacity="1",this.laserPointer.style.left=`${n}px`,this.laserPointer.style.top=`${r}px`):this.laserPointer.style.opacity="0"),this.spotlightMask&&this.isSpotlightActive&&!this.isBlackout&&(this.spotlightMask.style.background=`radial-gradient(circle 180px at ${n}px ${r}px, transparent 0%, rgba(5,10,20,0.85) 100%)`),i.gesture==="FIST"&&!this.isBlackout&&this.swipeCooldown<=0?(this.toggleBlackout(),this.swipeCooldown=1):i.gesture==="OPEN_PALM"&&this.isBlackout&&this.swipeCooldown<=0&&(this.toggleBlackout(),this.swipeCooldown=1);const a=i.pinching||i.gesture==="PINCH";this.el.querySelectorAll(".pres-nav-arrow").forEach(l=>{const h=l.getBoundingClientRect();n>=h.left&&n<=h.right&&r>=h.top&&r<=h.bottom?(l.classList.add("hovered"),a&&this.swipeCooldown<=0&&(l.click(),this.swipeCooldown=.5)):l.classList.remove("hovered")}),this.el.querySelectorAll(".pres-tool-btn").forEach(l=>{const h=l.getBoundingClientRect();n>=h.left&&n<=h.right&&r>=h.top&&r<=h.bottom?(l.classList.add("hovered"),a&&this.swipeCooldown<=0&&(l.click(),this.swipeCooldown=.4)):l.classList.remove("hovered")})}onSwipe(e){this.handleSwipe(e)}handleSwipe(e){this.visible&&(e===1?this.nextSlide():this.prevSlide())}setVisible(e){this.visible=e,this.el?.classList.toggle("hidden",!e)}dispose(){this.el?.remove()}}const Bc=2.4;class Qv{canvas;ui;renderer;scene;post;orb;performance;beams;trails;burst;reticle=new uv;scanArc=new dv;nodes=new gv;planets=new Sv;skeleton=new Mv;tracker=new Fv;gestures=new wv;mouse;adapter=new Rv;interaction;hud;boot;audio=new Xv;modeManager=new qv;modeSwitcher;rehabMode=new $v;panelMode=new Kv;photoMode=new Zv;slidesMode=new Jv;lastFrameTime=0;pixelRatio;tier;elapsed=0;frameHandle=0;running=!0;contextLost=!1;warmTimer=0;cameraBusy=!1;reducedMotion;highContrast;lastCameraState="OFF";handOpenActive=!1;lastHandOpenedAt="—";handOpenDuration=0;constructor(e,t){this.canvas=e,this.ui=t;const i=zc();this.tier=i.suggestedTier,this.reducedMotion=Va(An.reducedMotion)??i.prefersReducedMotion,this.highContrast=Va(An.highContrast)??!1;const n=Va(An.audio)??wr.enabledByDefault;this.audio.init(n);const r=l0(e,this.tier);this.renderer=r.renderer,this.pixelRatio=r.pixelRatio,this.scene=new B0(window.innerWidth/window.innerHeight,this.pixelRatio),this.orb=new av(this.tier,this.pixelRatio),this.scene.add(this.orb.group),this.beams=[new Pc(0),new Pc(1)],this.trails=[new Lc(this.pixelRatio),new Lc(this.pixelRatio)],this.burst=new cv(this.pixelRatio);for(const a of this.beams)this.scene.add(a.mesh);for(const a of this.trails)this.scene.add(a.points);if(this.scene.add(this.burst.group),this.scene.add(this.reticle.group),this.scene.add(this.scanArc.mesh),this.scene.add(this.nodes.group),this.scene.add(this.planets.group),this.scene.add(this.skeleton.group),this.post=new q0(this.renderer,this.scene.scene,this.scene.rig.camera,this.tier,window.innerWidth,window.innerHeight),this.performance=new Bh(this.tier,!0),this.mouse=new Av(e),this.mouse.attach(),this.mouse.setEnabled(!0),this.interaction=new Ev(this.orb,this.scene.rig,{beams:this.beams,trails:this.trails,reticle:this.reticle,scanArc:this.scanArc,nodes:this.nodes,skeleton:this.skeleton}),this.hud=new Gv(t),this.boot=new Wv(t,this.reducedMotion),this.rehabMode.build(t),this.panelMode.build(t),this.photoMode.build(t),this.slidesMode.build(t),this.photoMode.setBridge({getVideoElement:()=>this.tracker.isEnabled?this.tracker.feed.video:null,isCameraActive:()=>this.tracker.isEnabled,toggleCamera:()=>this.toggleCamera(),getCanvasElement:()=>this.canvas}),this.panelMode.setBridge({setMasterVolume:a=>{this.audio.setVolume(a)},setDisplayBrightness:a=>{e.style.filter=`brightness(${a}) contrast(${this.highContrast?1.3:1})`},setOrbitSpeed:a=>{this.planets.setTimeScale(a)},setCameraDistance:a=>{this.scene.rig.setDistance(6+a*14)},toggleFullscreen:()=>{document.fullscreenElement?document.exitFullscreen().catch(()=>{}):document.documentElement.requestFullscreen().catch(()=>{})},toggleSound:()=>{this.toggleAudio()},togglePlanets:()=>{const a=this.planets.toggleVisible();return this.hud.status.setControlState("planets",a?"ON":"OFF",a),a},setTopView:()=>{this.scene.rig.setTopView(),this.hud.gestures.toast("CAMERA: TOP VIEW")},resetView:()=>{this.scene.rig.resetView(),this.hud.gestures.toast("CAMERA: DEFAULT VIEW")},toggleHighContrast:()=>(this.setHighContrast(!this.highContrast),this.highContrast),toggleReducedMotion:()=>(this.setReducedMotion(!this.reducedMotion),this.reducedMotion)}),this.modeSwitcher=new Yv(t),this.modeSwitcher.onModeChange(a=>this.switchMode(a)),this.modeManager.onModeChange(({to:a})=>{this.modeSwitcher.setActive(a),this.rehabMode.setVisible(a==="REHAB"),this.panelMode.setVisible(a==="PANEL"),this.photoMode.setVisible(a==="PHOTO"),this.slidesMode.setVisible(a==="SLIDES")}),this.applyAccessibility(),this.registerControls(n),this.registerEvents(),n){const a=()=>{this.audio.isEnabled&&this.audio.setEnabled(!0),window.removeEventListener("pointerdown",a),window.removeEventListener("keydown",a)};window.addEventListener("pointerdown",a,{passive:!0}),window.addEventListener("keydown",a,{passive:!0})}this.boot.onFormationStart=()=>{this.reducedMotion?this.orb.completeFormation():this.orb.startFormation(),this.audio.play("boot")},this.boot.onComplete=()=>{this.nodes.setVisible(!0),this.hud.gestures.toast("READY FOR INTERACTION"),this.orb.firePulse()},this.hud.gestures.setMode(xr.NEURAL,0,li.length,!1),this.hud.status.setStatus("ONLINE"),this.resize(),this.lastFrameTime=performance.now(),this.loop()}registerControls(e){this.hud.status.addControl({id:"camera",label:"CAMERA",initialState:"OFF"},()=>void this.toggleCamera()),this.hud.status.addControl({id:"sound",label:"SOUND",initialState:e?"ON":"OFF",on:e},()=>void this.toggleAudio()),this.hud.status.addControl({id:"debug",label:"DEBUG",initialState:"OFF"},()=>this.toggleDebug()),this.hud.status.addControl({id:"hud",label:"INTERFACE",initialState:"ON",on:!0},()=>{const t=this.hud.toggleVisible();this.hud.status.setControlState("hud",t?"ON":"OFF",t)}),this.hud.status.addControl({id:"motion",label:"REDUCED MOTION",initialState:this.reducedMotion?"ON":"OFF",on:this.reducedMotion},()=>this.setReducedMotion(!this.reducedMotion)),this.hud.status.addControl({id:"contrast",label:"HIGH CONTRAST",initialState:this.highContrast?"ON":"OFF",on:this.highContrast},()=>this.setHighContrast(!this.highContrast)),this.hud.status.addControl({id:"planets",label:"9 PLANETS",initialState:"ON",on:!0},()=>{const t=this.planets.toggleVisible();this.hud.status.setControlState("planets",t?"ON":"OFF",t),this.hud.gestures.toast(t?"CELESTIAL SYSTEM ONLINE":"CELESTIAL SYSTEM HIDDEN")}),this.hud.status.addControl({id:"topview",label:"TOP VIEW",initialState:"VIEW"},()=>{this.scene.rig.setTopView(),this.hud.gestures.toast("CAMERA: TOP VIEW")}),this.hud.status.addControl({id:"resetview",label:"RESET VIEW",initialState:"VIEW"},()=>{this.scene.rig.resetView(),this.hud.gestures.toast("CAMERA: DEFAULT VIEW")})}registerEvents(){window.addEventListener("resize",this.resize),window.addEventListener("keydown",this.onKeyDown),document.addEventListener("visibilitychange",this.onVisibilityChange),c0(this.canvas,()=>{this.contextLost=!0,this.hud.gestures.toast("GRAPHICS CONTEXT LOST","warn"),this.hud.status.setStatus("RECOVERING","bad"),this.post.setAlert(!0)},()=>{this.contextLost=!1,this.hud.gestures.toast("GRAPHICS CONTEXT RESTORED"),this.hud.status.setStatus("ONLINE"),this.post.setAlert(!1),this.resize()}),this.performance.onQualityChange((e,t)=>{this.applyQuality(e),this.hud.gestures.toast(t==="downgrade"?`QUALITY REDUCED — ${e}`:`QUALITY RESTORED — ${e}`,t==="downgrade"?"warn":"normal")}),this.tracker.events.on("state",e=>this.onCameraState(e)),this.tracker.events.on("inference",()=>this.performance.markInference(performance.now())),this.tracker.events.on("error",e=>{this.hud.status.showNotice({title:e.kind==="denied"?"CAMERA ACCESS REQUIRED":"CAMERA UNAVAILABLE",body:e.kind==="denied"?"Gesture control needs the webcam. Allow camera access in your browser, then press CAMERA again. Video never leaves this device — every frame is processed locally.":`${e.message} You can keep using the interface with the mouse: move to steer, hold the left button to pinch, scroll to zoom.`,actions:[{label:"CONTINUE WITHOUT CAMERA",onClick:()=>this.hud.status.hideNotice()},{label:"RETRY",onClick:()=>void this.retryCamera()}]}),this.hud.status.setControlState("camera","DENIED",!1),this.mouse.setEnabled(!0)}),this.gestures.events.on("change",({to:e})=>{this.hud.gestures.notifyActivity(),e!=="IDLE"&&(this.hud.gestures.toast(Tv[e]),e==="HAND_DETECTED"&&this.audio.play("handDetected"),e==="OPEN_PALM"&&this.orb.firePulse())}),this.gestures.events.on("pinchStart",()=>{this.audio.play("pinch"),this.hud.gestures.notifyActivity()}),this.gestures.events.on("pinchEnd",()=>this.audio.play("release")),this.gestures.events.on("fistStart",()=>{this.orb.setContract(1),this.orb.setWarmTarget(1),this.warmTimer=Bc}),this.gestures.events.on("fistRelease",()=>{this.orb.setContract(0),this.orb.triggerBurst(),this.burst.fire(this.orb.group.position,We.radius*.4*this.orb.currentScale,Math.round(320*(this.tier==="LOW"?.5:1)),4.4,1),this.audio.play("power"),this.hud.gestures.toast("POWER SURGE"),this.warmTimer=Bc}),this.gestures.events.on("swipe",({direction:e})=>{if(this.modeManager.mode==="SLIDES"){this.slidesMode.onSwipe(e);return}const t=-e;this.changeMode(this.orb.cycleMode(t))}),this.nodes.onSelect=e=>{this.audio.play("select"),this.hud.gestures.toast(`${e.label} — ${e.detail}`)},this.boot.onStep=e=>{e.final&&this.audio.play("mode")},this.canvas.addEventListener("pointerdown",()=>this.boot.skip(),{once:!0})}async toggleCamera(){if(!this.cameraBusy){this.cameraBusy=!0,this.hud.status.hideNotice();try{if(this.tracker.isEnabled){this.tracker.disable(),this.mouse.setEnabled(!0),this.hud.debug.detachVideo(),this.hud.status.setControlState("camera","OFF",!1),this.interaction.reset();return}this.hud.status.setControlState("camera","STARTING…",!1),await this.tracker.enable()?(this.mouse.setEnabled(!1),this.hud.debug.attachVideo(this.tracker.feed.video),this.hud.status.setControlState("camera","ON",!0),this.hud.gestures.toast("OPTICAL INPUT ONLINE"),this.hud.gestures.notifyActivity()):(this.hud.status.setControlState("camera","OFF",!1),this.mouse.setEnabled(!0))}finally{this.cameraBusy=!1}}}async retryCamera(){this.hud.status.hideNotice(),await this.toggleCamera()}async toggleAudio(){const e=await this.audio.setEnabled(!this.audio.isEnabled);this.hud.status.setControlState("sound",e?"ON":"OFF",e),window.localStorage?.setItem(An.audio,String(e)),e&&this.audio.play("select")}toggleDebug(){const e=this.hud.debug.toggle();this.skeleton.setVisible(e),this.hud.status.setControlState("debug",e?"ON":"OFF",e),e&&this.tracker.isEnabled&&this.hud.debug.attachVideo(this.tracker.feed.video)}switchMode(e){this.modeManager.set(e),this.hud.gestures.toast(`${zo[e].icon} ${zo[e].label}`),this.audio.play("mode")}setReducedMotion(e){this.reducedMotion=e,this.applyAccessibility(),this.hud.status.setControlState("motion",e?"ON":"OFF",e),window.localStorage?.setItem(An.reducedMotion,String(e))}setHighContrast(e){this.highContrast=e,this.applyAccessibility(),this.hud.status.setControlState("contrast",e?"ON":"OFF",e),window.localStorage?.setItem(An.highContrast,String(e))}applyAccessibility(){document.body.classList.toggle("reduced-motion",this.reducedMotion),document.body.classList.toggle("high-contrast",this.highContrast),this.orb.setReducedMotion(this.reducedMotion),this.scene.rig.setReducedMotion(this.reducedMotion),this.post.setHighContrast(this.highContrast)}changeMode(e){this.hud.gestures.setMode(xr[e],li.indexOf(e),li.length),this.hud.gestures.toast(`MODE — ${xr[e]}`),this.audio.play("mode"),this.orb.firePulse()}applyQuality(e){this.tier=e,this.orb.setQuality(e),this.post.setQuality(e),this.pixelRatio=Math.min(window.devicePixelRatio||1,ns[e].pixelRatioCap),this.renderer.setPixelRatio(this.pixelRatio),this.orb.setPixelRatio(this.pixelRatio),this.scene.setPixelRatio(this.pixelRatio),this.burst.setPixelRatio(this.pixelRatio);for(const t of this.trails)t.setPixelRatio(this.pixelRatio);this.resize()}onCameraState(e){this.lastCameraState=e,e==="TRACKING_LOST"||e==="NO_HAND"?(this.post.setAlert(e==="TRACKING_LOST"),e==="TRACKING_LOST"&&this.audio.play("handLost")):this.post.setAlert(!1)}onKeyDown=e=>{if(e.metaKey||e.ctrlKey||e.altKey)return;const t=e.key.toLowerCase();if(t>="1"&&t<="5"){const i=li[Number(t)-1];i&&(this.orb.setMode(i),this.changeMode(i));return}switch(t){case"g":this.toggleCamera();break;case" ":e.preventDefault(),this.orb.firePulse(),this.orb.triggerBurst(),this.burst.fire(this.orb.group.position,We.radius*.4*this.orb.currentScale,260,4,0),this.planets.triggerPulse(),this.audio.play("power"),this.hud.gestures.toast("POWER PULSE");break;case"r":this.orb.resetOrientation(),this.interaction.reset(),this.scene.rig.resetView(),this.hud.gestures.setMode(xr.NEURAL,0,li.length),this.hud.gestures.toast("SYSTEM RESET");break;case"t":this.scene.rig.setTopView(),this.hud.gestures.toast("CAMERA: TOP VIEW");break;case"b":this.scene.rig.setBottomView(),this.hud.gestures.toast("CAMERA: BOTTOM VIEW");break;case"l":this.scene.rig.setLeftView(),this.hud.gestures.toast("CAMERA: LEFT VIEW");break;case"k":this.scene.rig.setRightView(),this.hud.gestures.toast("CAMERA: RIGHT VIEW");break;case"d":this.toggleDebug();break;case"h":{const i=this.hud.toggleVisible();this.hud.status.setControlState("hud",i?"ON":"OFF",i);break}case"c":this.toggleDebug();break;case"p":{const i=this.planets.toggleVisible();this.hud.status.setControlState("planets",i?"ON":"OFF",i),this.hud.gestures.toast(i?"CELESTIAL SYSTEM ONLINE":"CELESTIAL SYSTEM HIDDEN");break}case"m":this.switchMode(this.modeManager.cycle(1));break;case"escape":if(this.modeManager.mode!=="HOME"){this.switchMode("HOME");break}this.hud.status.hideNotice();break}};onVisibilityChange=()=>{this.running=!document.hidden,this.running&&(this.lastFrameTime=performance.now(),this.loop())};resize=()=>{const e=window.innerWidth,t=window.innerHeight;this.renderer.setSize(e,t,!1),this.scene.resize(e,t),this.post.setSize(e,t)};loop=()=>{if(!this.running)return;this.frameHandle=requestAnimationFrame(this.loop);const e=performance.now();this.renderer.info.reset();const t=(e-this.lastFrameTime)/1e3,i=Math.min(.05,t);this.lastFrameTime=e,this.elapsed+=i,this.performance.update(t),this.boot.update(i),this.tracker.update(e);const n=this.tracker.isEnabled,r=n?this.adapter.fromTracked(this.tracker.hands):this.adapter.fromPointer(this.mouse.update(i)),a=this.mouse.consumeDrag();(a.x!==0||a.y!==0)&&this.scene.rig.orbit(-a.x*.0055,-a.y*.0055);const o=this.mouse.consumeZoom();o!==0&&(this.orb.nudgeScale(o*1.2),this.scene.rig.nudgeDistance(-o*3.5));const c=this.gestures.update(r,i),l=this.scene.rig.camera;this.interaction.update(i,this.elapsed,r,c,l.quaternion),this.warmTimer>0&&(this.warmTimer-=i,this.warmTimer<=0&&this.orb.setWarmTarget(0)),this.orb.update(i,this.elapsed,l),this.burst.update(i,this.elapsed,l.quaternion),this.planets.update(i,this.orb.activation),this.scene.update(i,this.elapsed,this.orb.activation,this.orb.warmth),this.post.update(i,this.elapsed,this.orb.activation),this.contextLost||this.post.render();const h=this.modeManager.mode,p=this.adapter.current;h==="REHAB"&&this.rehabMode.update(i,p),h==="PANEL"&&this.panelMode.update(i,p),h==="PHOTO"&&this.photoMode.update(i,p),h==="SLIDES"&&this.slidesMode.update(i,p),this.updateHud(i,c,n)};updateHud(e,t,i){const n=this.adapter.current,r=this.performance.frameTimeMs,a=Rt(r/16.67),o=i?yv[this.lastCameraState]:(this.tracker.state==="DENIED","POINTER CONTROL"),c=this.lastCameraState==="TRACKING_LOST"||this.lastCameraState==="ERROR"?"bad":i&&this.lastCameraState!=="TRACKING"?"warn":"ok",l=n[0]?.active?yr[n[0].gesture]:n[1]?.active?yr[n[1].gesture]:"STANDBY",h=this.orb.activation,p=n[0]?.active&&(n[0].gesture==="OPEN_PALM"||n[0].extendedCount>=4)||n[1]?.active&&(n[1].gesture==="OPEN_PALM"||n[1].extendedCount>=4),u=new Date,m=String(u.getHours()).padStart(2,"0"),g=String(u.getMinutes()).padStart(2,"0"),x=String(u.getSeconds()).padStart(2,"0"),f=String(u.getMilliseconds()).padStart(3,"0"),d=`${m}:${g}:${x}.${f}`,E=`${u.toISOString().slice(0,10)}  ${d}`;p?(this.handOpenActive||(this.handOpenActive=!0,this.lastHandOpenedAt=d,this.handOpenDuration=0),this.handOpenDuration+=e):this.handOpenActive=!1;const S=n[0]?.active?n[0].extendedCount/5:0,M=n[1]?.active?n[1].extendedCount/5:0,b=Math.max(S,M);if(this.hud.update(e,{cameraLabel:o,cameraLevel:c,hands:[{present:n[0].active,label:n[0].label,confidence:n[0].confidence,gesture:yr[n[0].gesture]},{present:n[1].active,label:n[1].label,confidence:n[1].confidence,gesture:yr[n[1].gesture]}],gestureLabel:l,handCount:(n[0].active?1:0)+(n[1].active?1:0),power:h,neural:Rt(h*.72+.2+Math.sin(this.elapsed*1.3)*.05),gpuEstimate:a,latencyMs:i?this.tracker.lastInferenceMs:0,fps:this.performance.fps,quality:this.tier,processing:i?`VISION / ${this.tracker.visionMode.toUpperCase()}`:"POINTER",energyLabel:h>.85?"SURGE":h>.5?"ELEVATED":"NOMINAL",realtimeClock:E,isHandOpen:p,handOpenedAt:this.lastHandOpenedAt,handOpenDuration:this.handOpenDuration,handOpenness:b}),this.hud.debug.isOpen){const R=this.renderer.info;this.hud.debug.update({fps:this.performance.fps,inferenceFps:this.performance.inferenceFps,inferenceMs:this.tracker.lastInferenceMs,visionMode:i?this.tracker.visionMode:"pointer",delegate:i?this.tracker.delegate:"—",cameraState:this.lastCameraState,gestureState:t,confidence:Math.max(n[0].confidence,n[1].confidence),handWorld:jv(this.interaction.worldPosition(0)),pinchDistance:n[0].active?n[0].pinchDistance:n[1].pinchDistance,particles:this.orb.stats.particles,connections:this.orb.stats.connections,motes:this.orb.stats.motes,quality:this.tier,drawCalls:R.render.calls,triangles:R.render.triangles,programs:R.programs?.length??0,pixelRatio:this.pixelRatio}),this.hud.debug.drawLandmarks([n[0].landmarks,n[1].landmarks])}}dispose(){this.running=!1,cancelAnimationFrame(this.frameHandle),window.removeEventListener("resize",this.resize),window.removeEventListener("keydown",this.onKeyDown),document.removeEventListener("visibilitychange",this.onVisibilityChange),this.tracker.dispose(),this.mouse.dispose(),this.orb.dispose(),this.scene.dispose(),this.post.dispose(),this.burst.dispose(),this.reticle.dispose(),this.scanArc.dispose(),this.nodes.dispose(),this.planets.dispose(),this.skeleton.dispose();for(const e of this.beams)e.dispose();for(const e of this.trails)e.dispose();this.audio.dispose(),this.renderer.dispose(),this.rehabMode.dispose(),this.panelMode.dispose(),this.photoMode.dispose(),this.slidesMode.dispose(),this.ui.replaceChildren()}}function jv(s){return`${s.x.toFixed(2)}, ${s.y.toFixed(2)}, ${s.z.toFixed(2)}`}function Va(s){try{const e=window.localStorage?.getItem(s);return e==null?null:e==="true"}catch{return null}}function Tr(s,e){const t=document.createElement("div");t.className="fatal";const i=document.createElement("h1");i.textContent=s;const n=document.createElement("p");n.textContent=e,t.append(i,n),document.body.append(t)}function kc(){const s=document.getElementById("scene"),e=document.getElementById("ui");if(!(s instanceof HTMLCanvasElement)||!e){Tr("INTERFACE FAILED TO MOUNT","The application shell could not be found in the page.");return}if(!zc().webgl){Tr("WEBGL ENGINE UNAVAILABLE","Please use a modern browser with hardware acceleration enabled.");return}try{const i=new Qv(s,e),n=window;n.brahmastra=i,n.ultimaitron=i,n.nexus=i,window.addEventListener("beforeunload",()=>i.dispose())}catch(i){console.error(`[${Ls.name}] failed to start:`,i),i instanceof Th?Tr("WEBGL ENGINE UNAVAILABLE","Please use a modern browser with hardware acceleration enabled."):Tr("CORE INITIALISATION FAILED",i instanceof Error?i.message:"An unknown error prevented start-up.")}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",kc,{once:!0}):kc();
