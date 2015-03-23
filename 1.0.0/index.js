var $ = require('node').all;

var settings = {},
    tabs = {},
    url = {},
    urlString,
    i,
    temp;

// Local Storage
var storage = (function () {
    try {
        if (window.localStorage && window.localStorage !== null) {
            return {
                save: function (param, key) {
                    if (typeof key === "object") {
                        key = JSON.stringify(key);
                    }
                    try {
                        localStorage.setItem(param, key);
                    } catch (e) {
                        if (e === "QUOTA_EXCEEDED_ERR") {
                            localStorage.clear();
                            localStorage.setItem(param, key);
                        }
                    }
                },
                load: function (param) {
                    try {
                        return JSON.parse(localStorage.getItem(param));
                    } catch (e) {
                        return localStorage.getItem(param);
                    }
                },
                del: function (param) {
                    localStorage.removeItem(param);
                }
            };
        }
    } catch (e) {
        return {
            save: function () {
                return null;
            },
            load: function () {
                return null;
            },
            del: function () {
                return null;
            }
        };
    }
    return null;
}());

// Url
var getUrl = function () {
    if (settings.type === "hash") {
        urlString = location.hash;
    }
    if (settings.type === "storage") {
        urlString = storage.load(location.hostname + "__effectTabsPosition");
    }

    if (urlString) {
        urlString = urlString.split("|");

        if (urlString.length > 1) {
            for (i = 1; i < urlString.length; i += 1) {
                temp = urlString[i].split(":");
                url[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
            }
        }

        urlString = "";
    }
};

// EffectTabs engine
var EffectTabs = function (container,options) {
    settings = S.merge({
        type: "hash",
        onChange: null
    }, options);

    this.container = $(container);
};

EffectTabs.prototype = {
    init: function () {
        var $container = this.container,
            $tabs = $container.all(".effectTabs__tab"),
            $items = $container.all(".effectTabs__item"),
            $this,

            name = $container.attr("data-name"),
            id;

        $tabs.each(function () {
            $this = $(this);
            id = "Button__" + name + "__" + $this.attr("data-target");
            $this.prop("id", id);
        });

        $items.each(function () {
            $this = $(this);
            id = "Tab__" + name + "__" + $this.attr("data-name");
            $this.prop("id", id);
        });


        $tabs.on("click", function(e){
            e.preventDefault();
            setTab($(this).attr("data-target"));
        });


        var setTab = function (target) {
            target = decodeURIComponent(target);
            id = "#Button__" + name + "__" + target;
            $(id).addClass("effectTabs__tab_state_active").siblings().removeClass("effectTabs__tab_state_active");

            id = "#Tab__" + name + "__" + target;
            $(id).addClass("effectTabs__item_state_active").siblings().removeClass("effectTabs__item_state_active");

            setUrl(target);

            if (typeof settings.onChange === "function") {
                settings.onChange({
                    group: name,
                    tab: target,
                    tabId: id
                });
            }
        };

        var setUrl = function (target) {
            var prop;
            url[name] = target;
            urlString = "tabs";

            for (prop in url) {
                if (url.hasOwnProperty(prop)) {
                    urlString += "|" + encodeURIComponent(prop) + ":" + encodeURIComponent(url[prop]);
                }
            }

            if (settings.type === "hash") {
                location.hash = urlString;
            }
            if (settings.type === "storage") {
                storage.save(location.hostname + "__effectTabsPosition", urlString);
            }
        };

        getUrl();

        // Set tabs at start
        if (url[name]) {
            setTab(url[name]);
        } else {
            setTab($tabs.item(0).attr("data-target"));
        }

        // Public
        this.setTab = function (name) {
            setTab(name);
        };
    }
};


module.exports = EffectTabs;

