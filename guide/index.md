## 综述

EffectTabs是一个淘宝选项卡动效组件示例，我们期待大家遵循统一的动效展示形式，本组件可作为一种参考。

## 描述

* 支持在一页中有多个选项卡。
* 支持回调。
* 支持多种类型的位置保存。
* 支持外部控制。
* 跨浏览器支持:Google Chrome, Mozilla Firefox, Opera, Safari, IE(8.0+)

## 初始化组件

创建这个HTML结构:
```html
<div class="ionTabs" id="tabs_1" data-name="Tabs_Group_name">
    <ul class="ionTabs__head">
        <li class="ionTabs__tab" data-target="Tab_1_name">Tab 1 name</li>
        <li class="ionTabs__tab" data-target="Tab_2_name">Tab 2 name</li>
        <li class="ionTabs__tab" data-target="Tab_3_name">Tab 3 name</li>
    </ul>
    <div class="ionTabs__body">
        <div class="ionTabs__item" data-name="Tab_1_name">
            Tab 1 content
        </div>
        <div class="ionTabs__item" data-name="Tab_2_name">
            Tab 2 content
        </div>
        <div class="ionTabs__item" data-name="Tab_3_name">
            Tab 3 content
        </div>
    </div>
</div>
```

初始化选项卡
```javascript
    S.use('kg/effect-tabs/1.0.0/index', function (S, EffectTabs) {
        var tabs = new EffectTabs('#tabs_1',{
            type: "hash",
            onChange: function(){
                console.log('this is callback')
            }
        });
        tabs.init();
    })
```

从外部切换选项卡: 
```javascript
$(".myButton").on("click", function(){
    tabs.setTab("Tab_1_name");
});
```

## 参数配置
<table class="options">
    <thead>
        <tr>
            <th>属性名</th>
            <th>默认值</th>
            <th>描述</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>type</td>
            <td><code>hash</code></td>
            <td>
                可选属性,选择位置保存类型:<br/>
                <code>hash</code> — 标签的位置保存到网站的url,使用hash。可以通过链接发送标签的位置。<br/>
                <code>storage</code> — 标签的位置保存到本地存储。标签位置是记得只在一台计算机。<br/>
                <code>none</code> — 不保存标签的位置。每次页面重新加载,每组的第一个选项卡将激活。<br/>
            </td>
        </tr>
    </tbody>
</table>

## 回调配置
<table class="options">
    <thead>
        <tr>
            <th>属性名</th>
            <th>默认值</th>
            <th>描述</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>onChange</td>
            <td>-</td>
            <td>调用每次切换选项卡,返回对象组名称,选项卡名称和当前选项卡的ID。</td>
        </tr>
    </tbody>
</table>