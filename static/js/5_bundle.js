(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{1339:function(e,t,a){},1340:function(e,t,a){e.exports=a.p+"static/images/7b261c.jpg"},1341:function(e,t,a){},1347:function(e,t,a){"use strict";a.r(t);var n,s=a(1),l=(a(1339),a(1340)),c=a.n(l),r=a(191),i=a(329),o=a(499),m=a(1289),p=(a(1341),n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var a in t)t.hasOwnProperty(a)&&(e[a]=t[a])})(e,t)},function(e,t){function a(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(a.prototype=t.prototype,new a)}),u=function(e){function t(t){var a=e.call(this,t)||this;return a.handleOnBlue=function(){a.state.inputValue.length>0&&a.setState({isDisplayInput:!1},function(){a.props.onBlur&&a.props.onBlur(a.state.inputValue)})},a.switchComponent=function(){a.setState({isDisplayInput:!0},function(){a.input.focus()})},a.handleOnChange=function(e){a.setState({inputValue:e.target.value})},a.state={isDisplayInput:!1,defaultInfo:a.props.defaultInfo?a.props.defaultInfo:"缺失的信息:",defaultOperationInfo:a.props.defaultOperationInfo?a.props.defaultOperationInfo:"缺失的操作提示"},a}return p(t,e),t.prototype.render=function(){var e=this;return s.createElement("div",{className:"submitInfoContainer"},this.state.isDisplayInput?s.createElement(m.a,{value:this.state.inputValue,onChange:this.handleOnChange,className:"submitInput",onBlur:this.handleOnBlue,ref:function(t){return e.input=t}}):"",this.state.isDisplayInput?"":s.createElement("span",{className:"no-value"},this.state.defaultInfo,s.createElement("span",{onClick:this.switchComponent,className:"supplement"}," ",this.state.defaultOperationInfo)))},t}(s.Component),d=a(1277),E=a.n(d),f=a(1301),v=a(192),h=function(){var e=function(t,a){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var a in t)t.hasOwnProperty(a)&&(e[a]=t[a])})(t,a)};return function(t,a){function n(){this.constructor=t}e(t,a),t.prototype=null===a?Object.create(a):(n.prototype=a.prototype,new n)}}(),y=r.a.Option,N=function(e){function t(t){var a=e.call(this,t)||this;return a.GetWaterDetailByStcd=function(e){a.setState({isSpinning:!0},function(){Object(f.b)("api/river/queryBaseInformationGet",e).then(function(e){a.setState({isSpinning:!1})},function(e){}),a.setState({isSpinning:!1})})},a.handleOnBlue=function(e){a.setState({isTest:!1,testData:e})},a.state={isTest:!0,isSpinning:!0,chartOption:{tooltip:{trigger:"axis",axisPointer:{type:"cross",crossStyle:{color:"#999"}}},grid:{left:"0px",right:"40px",bottom:"8px",containLabel:!0},toolbox:{show:!1,feature:{dataView:{show:!0,readOnly:!1},magicType:{show:!0,type:["line","bar"]},restore:{show:!0},saveAsImage:{show:!0}}},legend:{data:["蒸发量","降水量","平均温度"]},xAxis:[{type:"value",name:"水量",min:0,max:250,interval:50,axisLabel:{formatter:"{value} ml"}},{type:"value",name:"温度",min:0,max:25,interval:5,axisLabel:{formatter:"{value} °C"}}],yAxis:[{type:"category",data:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],axisPointer:{type:"shadow"}}],series:[{name:"蒸发量",type:"bar",data:[2,4.9,7,23.2,25.6,76.7,135.6,162.2,32.6,20,6.4,3.3]},{name:"降水量",type:"bar",data:[2.6,5.9,9,26.4,28.7,70.7,175.6,182.2,48.7,18.8,6,2.3]},{name:"平均温度",type:"line",data:[2,2.2,3.3,4.5,6.3,10.2,20.3,23.4,23,16.5,12,6.2]}]}},a}return h(t,e),t.prototype.componentDidMount=function(){var e={stcd:this.props.data.stcd};this.GetWaterDetailByStcd(e)},t.prototype.render=function(){return s.createElement(i.a,{spinning:this.state.isSpinning,tip:v.a.system.loadingText},s.createElement("div",{className:"widgetContainer"},s.createElement("div",{className:"widgetTitle"},"测站信息"),s.createElement("div",{className:"content"},s.createElement("div",{className:"contentItem"},s.createElement("span",{className:"key"},"测站编码:"),s.createElement("span",{className:"value"},this.props.data.stcd?this.props.data.stcd:"10812092")),s.createElement("div",{className:"contentItem"},s.createElement("span",{className:"key"},"测站名称:"),s.createElement("span",{className:"value"},this.props.data.name?this.props.data.name:"测试测站")),s.createElement("div",{className:"contentItem"},s.createElement("span",{className:"key"},"河流名称:"),this.state.isTest?s.createElement(u,{defaultInfo:"测试河流名称",defaultOperationInfo:"测试操作提示",onBlur:this.handleOnBlue}):s.createElement(o.a,{title:this.state.testData},s.createElement("span",{className:"value"},this.state.testData))),s.createElement("div",{className:"contentItem"},s.createElement("span",{className:"key"},"水系名称:"),s.createElement("span",{className:"no-value"},this.props.data.name,s.createElement("span",{className:"supplement"}," 我要补充"))),s.createElement("div",{className:"contentItem"},s.createElement("span",{className:"key"},"流域名称:"),s.createElement("span",{className:"no-value"},this.props.data.name,s.createElement("span",{className:"supplement"}," 我要补充"))),s.createElement("div",{className:"contentItem"},s.createElement("span",{className:"key"},"行政区划:"),s.createElement("span",{className:"value"},"福安市")),s.createElement("div",{className:"contentItem"},s.createElement("span",{className:"key"},"启用标志:"),s.createElement("span",{className:"value"},"启用")),s.createElement("div",{className:"contentItem"},s.createElement("span",{className:"key"},"建站年月:"),s.createElement("span",{className:"no-value"},this.props.data.name,s.createElement("span",{className:"supplement"}," 我要补充"))),s.createElement("div",{className:"contentItem"},s.createElement("span",{className:"key"},"经度:"),s.createElement("span",{className:"value"},"109.65589")),s.createElement("div",{className:"contentItem"},s.createElement("span",{className:"key"},"纬度:"),s.createElement("span",{className:"value"},"27.08952")),s.createElement("div",{className:"contentItem"},s.createElement("span",{className:"key"},"站址:"),s.createElement(o.a,{title:"公共厕所围栏角落立杆，备选地址泵站旁"},s.createElement("span",{className:"value"},"公共厕所围栏角落立杆，备选地址泵站旁"))),s.createElement("div",{className:"contentItem"},s.createElement("span",{className:"key"},"站类:"),s.createElement("span",{className:"value"},"水位雨量站")),s.createElement("div",{className:"contentItem"},s.createElement("span",{className:"key"},"备注:"),s.createElement(o.a,{title:"４米高，臂3米长，直径150"},s.createElement("span",{className:"value"},"４米高，臂3米长，直径150"))),s.createElement("div",{className:"contentItem"},s.createElement("span",{className:"image-key"},"图像:"),s.createElement("span",{className:"image-value"},s.createElement("img",{src:c.a,alt:"test"})))),s.createElement("div",{className:"widgetTitle"},"实时信息"),s.createElement("div",{className:"subtitle"},"凤鸣.鱼龙站前三天水位趋势"),s.createElement("div",{className:"data-visual-content"},s.createElement("div",{className:"operateArea"},s.createElement("div",{className:"operateUnit"},s.createElement("div",{className:"operateTitle"},"当前模式"),s.createElement(r.a,{style:{width:"100%"},placeholder:"请选择模式",defaultValue:"水位趋势"},s.createElement(y,{key:"1"},"水位趋势"),s.createElement(y,{key:"2"},"水位趋势2"),s.createElement(y,{key:"3"},"水位趋势3"))),s.createElement("div",{className:"operateUnit"},s.createElement("div",{className:"operateTitle"},"新建工单"),s.createElement(r.a,{mode:"tags",style:{width:"100%"},placeholder:"请选择工单",defaultValue:"需要临场检查1"},s.createElement(y,{key:"2"},"需要临场检查2"),s.createElement(y,{key:"3"},"需要临场检查3"))),s.createElement(E.a,{option:this.state.chartOption,lazyUpdate:!0,style:{height:"500px"},className:"data-visual",opts:{renderer:"svg"}})))))},t}(s.Component);t.default=N}}]);