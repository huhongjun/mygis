/*
 * This script was created by Erik Arvidsson (erik@eae.net)
 * for WebFX (http://webfx.eae.net)
 * Copyright 2001
 * 
 * For usage see license at http://webfx.eae.net/license.html	
 *
 * Created:		2001-01-12
 * Updates:		2001-11-20	Added hover mode support and removed Opera focus hacks
 */
// define the default values
webfxMenuDefaultWidth			= 100;
webfxMenuDefaultBorderWidth		= 2;
webfxMenuDefaultPaddingWidth	= 2;
webfxMenuDefaultBorderTop		= 1;
webfxMenuDefaultPaddingTop		= 1;

webfxMenuItemDefaultHeight		= 18;
webfxMenuItemDefaultText		= "Untitled";
webfxMenuItemDefaultHref		= "javascript:void(0)";

webfxMenuSeparatorDefaultHeight	= 6;

webfxMenuDefaultImagePath		= "";
webfxMenuDefaultEmptyText		= "Empty";

webfxMenuUseHover				= false;webfxMenuHideTime				= 400;
webfxMenuShowTime				= 0;
// check browsers
var op = /opera 5|opera\/5/i.test(navigator.userAgent);
var ie = !op && /msie/i.test(navigator.userAgent);	// preventing opera to be identified as ie
var mz = !op && /mozilla\/5/i.test(navigator.userAgent);	// preventing opera to be identified as mz
var ieBox = ie && /win/i.test(navigator.platform) && (document.compatMode == null || document.compatMode == "BackCompat");	// IE proprietary box model
var ie50 = /msie 5\.[01234]/i.test(navigator.userAgent);

var webFXMenuHandler = {
	idCounter		:	0,
	idPrefix		:	"webfx-menu-object-",
	getId			:	function () { return this.idPrefix + this.idCounter++; },
	overMenuItem	:	function (oItem) {		if (this.showTimeout != null)			window.clearTimeout(this.showTimeout);
		if (this.hideTimeout != null)			window.clearTimeout(this.hideTimeout);
		var jsItem = this.all[oItem.id];
		if (webfxMenuShowTime <= 0)
			this._over(jsItem);
		else			this.showTimeout = window.setTimeout(function () { webFXMenuHandler._over(jsItem) ; }, webfxMenuShowTime);
	},
	outMenuItem	:	function (oItem) {
		if (this.showTimeout != null)			window.clearTimeout(this.showTimeout);
		if (this.hideTimeout != null)			window.clearTimeout(this.hideTimeout);
		var jsItem = this.all[oItem.id];
		if (webfxMenuHideTime <= 0)
			this._out(jsItem);
		else			this.hideTimeout = window.setTimeout(function () { webFXMenuHandler._out(jsItem) ; }, webfxMenuHideTime);	},	blurMenu		:	function (oMenuItem) {
		window.setTimeout("webFXMenuHandler.all[\"" + oMenuItem.id + "\"].subMenu.hide();", webfxMenuHideTime);
	},
	_over	:	function (jsItem) {		if (jsItem.subMenu) {
			jsItem.parentMenu.hideAllSubs();
			jsItem.subMenu.show();
		}
		else
			jsItem.parentMenu.hideAllSubs();	},	_out	:	function (jsItem) {
		// find top most menu
		var root = jsItem;
		var m;		if (root instanceof WebFXMenuButton)			m = root.subMenu;		else {
			m = jsItem.parentMenu;
			while (m.parentMenu != null && !(m.parentMenu instanceof WebFXMenuBar))				m = m.parentMenu;		}		if (m != null)	
			m.hide();		},	all				:	{}
};

function WebFXMenu() {
	this._menuItems	= [];
	this._subMenus	= [];
	this.id			= webFXMenuHandler.getId();
	this.top		= 0;
	this.left		= 0;
	this.shown		= false;	this.parentMenu	= null;
	webFXMenuHandler.all[this.id] = this;
}
WebFXMenu.prototype.width			= webfxMenuDefaultWidth;
WebFXMenu.prototype.borderWidth		= webfxMenuDefaultBorderWidth;
WebFXMenu.prototype.paddingWidth	= webfxMenuDefaultPaddingWidth;
WebFXMenu.prototype.borderTop		= webfxMenuDefaultBorderTop;
WebFXMenu.prototype.paddingTop		= webfxMenuDefaultPaddingTop;
WebFXMenu.prototype.emptyText		= webfxMenuDefaultEmptyText;

WebFXMenu.prototype.add = function (menuItem) {
	this._menuItems[this._menuItems.length] = menuItem;
	if (menuItem.subMenu) {
		this._subMenus[this._subMenus.length] = menuItem.subMenu;
		menuItem.subMenu.parentMenu = this;	}
	
	menuItem.parentMenu = this;
};
WebFXMenu.prototype.show = function () {
	var divElement = document.getElementById(this.id);
	divElement.style.left = op ? this.left : this.left + "px";
	divElement.style.top = op ? this.top : this.top + "px";
	divElement.style.visibility = "visible";
	this.shown = true;
	if (this.parentMenu)
		this.parentMenu.show();
};
WebFXMenu.prototype.hide = function () {
	this.hideAllSubs();
	var divElement = document.getElementById(this.id);
	divElement.style.visibility = "hidden";
	this.shown = false;
};
WebFXMenu.prototype.hideAllSubs = function () {
	for (var i = 0; i < this._subMenus.length; i++) {
		if (this._subMenus[i].shown)
			this._subMenus[i].hide();
	}
};
WebFXMenu.prototype.toString = function () {
	var top = this.top + this.borderTop + this.paddingTop;
	var str = "<div id='" + this.id + "' class='webfx-menu' style='" + 
	"width:" + (!ieBox  ?  this.width - this.borderWidth - this.paddingWidth  :  this.width) + "px;" +
	"left:" + this.left + "px;" +
	"top:" + this.top + "px;" +
	(ie50 ? "filter: none;" : "") +
	"'>";

	
	if (this._menuItems.length == 0) {
		str += "<span class='webfx-menu-empty'>" + this.emptyText + "</span>";
	}
	else {	
		// loop through all menuItems
		for (var i = 0; i < this._menuItems.length; i++) {
			var mi = this._menuItems[i]
			str += mi;
			if (mi.subMenu)
				mi.subMenu.top = top - mi.subMenu.borderTop - mi.subMenu.paddingTop;
			top += mi.height;
		}

	}
	
	str += "</div>";

	for (var i = 0; i < this._subMenus.length; i++) {
		this._subMenus[i].left = this.left + this.width - this._subMenus[i].borderWidth/2;
		str += this._subMenus[i];
	}
	
	return str;
};
function WebFXMenuItem(sText, sHref, sToolTip, oSubMenu) {
	this.text = sText || webfxMenuItemDefaultText;
	this.href = (sHref == null || sHref == "") ? webfxMenuItemDefaultHref : sHref;
	this.subMenu = oSubMenu;
	if (oSubMenu)
		oSubMenu.parentMenuItem = this;
	this.toolTip = sToolTip;
	this.id = webFXMenuHandler.getId();
	webFXMenuHandler.all[this.id] = this;
};
WebFXMenuItem.prototype.height = webfxMenuItemDefaultHeight;
WebFXMenuItem.prototype.toString = function () {
	return	"<a" +
			" id='" + this.id + "'" +
			" href='" + this.href + "'" +
			(this.toolTip ? " title='" + this.toolTip + "'" : "") +
			" onmouseover='webFXMenuHandler.overMenuItem(this)'" +			(webfxMenuUseHover ? " onmouseout='webFXMenuHandler.outMenuItem(this)'" : "") +
			">" +
			(this.subMenu ? "<img class='arrow' src='" + webfxMenuDefaultImagePath + "arrow.right.gif'>" : "") +
			this.text + 
			"</a>";
};


function WebFXMenuSeparator() {
	this.id = webFXMenuHandler.getId();
	webFXMenuHandler.all[this.id] = this;
};
WebFXMenuSeparator.prototype.height = webfxMenuSeparatorDefaultHeight;
WebFXMenuSeparator.prototype.toString = function () {
	return	"<div" +
			" id='" + this.id + "'" +			(webfxMenuUseHover ? 
			" onmouseover='webFXMenuHandler.overMenuItem(this)'" +			" onmouseout='webFXMenuHandler.outMenuItem(this)'"
			:
			"") +			"></div>"
};

function WebFXMenuBar() {
	this._parentConstructor = WebFXMenu;
	this._parentConstructor();
}
WebFXMenuBar.prototype = new WebFXMenu;
WebFXMenuBar.prototype.toString = function () {
	var str = "<div id='" + this.id + "' class='webfx-menu-bar'>";
	
	// loop through all menuButtons
	for (var i = 0; i < this._menuItems.length; i++)
		str += this._menuItems[i];
	
	str += "</div>";

	for (var i = 0; i < this._subMenus.length; i++)
		str += this._subMenus[i];
	
	return str;
};

function WebFXMenuButton(sText, sHref, sToolTip, oSubMenu) {
	this._parentConstructor = WebFXMenuItem;
	this._parentConstructor(sText, sHref, sToolTip, oSubMenu);
}
WebFXMenuButton.prototype = new WebFXMenuItem;
WebFXMenuButton.prototype.toString = function () {
	return	"<a" +
			" id='" + this.id + "'" +
			" href='" + this.href + "'" +
			(this.toolTip ? " title='" + this.toolTip + "'" : "") +			(webfxMenuUseHover ?				(" onmouseover='webFXMenuHandler.overMenuItem(this)'" +				" onmouseout='webFXMenuHandler.outMenuItem(this)'")			:
				(
					" onfocus='webFXMenuHandler.overMenuItem(this)'" +
					(this.subMenu ? " onblur='webFXMenuHandler.blurMenu(this)'" : "")
				)) +
			">" +
			this.text + 
			(this.subMenu ? " <img class='arrow' src='" + webfxMenuDefaultImagePath + "arrow.down.gif' align='absmiddle'>" : "") +				
			"</a>";
};