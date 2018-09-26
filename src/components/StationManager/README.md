
# MenuPanelContainer
## 使用
``` typescript
<MenuPanelContainer visible={this.state.menuPanelVisible} getCurrentMenuItem ={this.getCurrentMenuItem.bind(this)}/>
```
|序号|名称|类型|说明|默认值|
|---------|:---------|:-------|:--------|:------
|1|visible|boolean|可见性控制|false
|2|getCurrentMenuItem|method|一个有参函数，返回值类型为string，会返回当前MenuPanelContainer面板上被点击功能的唯一标识，这个标识用来告诉MenuItemPanelContainer面板当前显示时应该加载哪一个功能项组件|无
|3|menuArr|对象数组|MenuItemPanelContainer组件中当前展示的功能|error

# MenuItemPanel
## 使用
``` typescript
<MenuItemPanelContainer menuItemPanelClose = {this.menuPanelShowAndMenuItemPanelHidden} currentMenuItem= {this.state.currentMenuItem} visible={this.state.menuItemPanelVisible} />
    )
```
|序号|名称|类型|说明|默认值|
|---------|:---------|:-------|:--------|:------
|1|visible|boolean|可见性控制|false
|2|menuItemPanelClose|method|无参函数，用于在menuItemPanelContainer中做menuItemPanelContainer的关闭|无
|3|currentMenuItem|string|标识menuItemPanelContainer当前需要加载的组件|''