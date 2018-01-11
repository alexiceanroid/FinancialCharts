﻿var tabTitle = $("#tab_title"),
    tabContent = $("#tab_content"),
    tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>",
    tabCounter = 2;

var tabs = $("#tabs").tabs();

// Modal dialog init: custom buttons and a "close" callback resetting the form inside
var dialog = $("#dialog").dialog({
    autoOpen: false,
    modal: true,
    buttons: {
        Add: function () {
            addTab();
            $(this).dialog("close");
        },
        Cancel: function () {
            $(this).dialog("close");
        }
    },
    close: function () {
        form[0].reset();
    }
});

// AddTab form: calls addTab function on submit and closes the dialog
var form = dialog.find("form").on("submit", function (event) {
    addTab();
    dialog.dialog("close");
    event.preventDefault();
});

// Actual addTab function: adds new tab using the input from the form above
function addTab(assetId, assetName ) {
    var label = assetName,
        id = "tabs-" + assetId,
        li = $(tabTemplate.replace(/#\{href\}/g, "#" + id).replace(/#\{label\}/g, label));

    tabs.find(".ui-tabs-nav").append(li);
    tabs.append("<div id='" + id + "'></div>");
    tabs.tabs("refresh");
    //tabCounter++;
}

function OnAssetSelected() {
    var assetsMenu = document.getElementById("AssetsMenu");
    var assetId = assetsMenu.options[assetsMenu.selectedIndex].value;
    var assetName = assetsMenu.options[assetsMenu.selectedIndex].text;
    addTab(assetId, assetName);
}


// AddTab button: just opens the dialog
$("#add_tab")
    .button()
    .on("click", function () {
        dialog.dialog("open");
    });

// Close icon: removing the tab on click
tabs.on("click", "span.ui-icon-close", function () {
    var panelId = $(this).closest("li").remove().attr("aria-controls");
    $("#" + panelId).remove();
    tabs.tabs("refresh");
});

tabs.on("keyup", function (event) {
    if (event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE) {
        var panelId = tabs.find(".ui-tabs-active").remove().attr("aria-controls");
        $("#" + panelId).remove();
        tabs.tabs("refresh");
    }
});