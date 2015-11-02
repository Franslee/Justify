/*
 * Justify
 *
 * Copyright (c) 2015 Frans Lee dmon@foxmail.com
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Version:  1.0
 *
 */
;(function(window, document, undefined) {
    'use strict';

    /**
     * Instantiate parameters
     *
     * @constructor
     */
    function Justify(dom, options) {
        this.ul = null;
        this.lis = [];
        this.extraLis = [];
        this.preItemTop = 0;
        this.numPreLine = 0;
        this.resetLiFontSize = false;
        this.ulFontSize = 0;
        this.numLastLine = 0;

        this.opt = {
            removeBtmGap: false
        };

        this.init(dom, options);
    }

    /**
     * Calculate the amount of the last line of the inline-block nodes
     */
    Justify.prototype.calcLastLineNum = function() {
        for (var i = 0; i < this.lis.length; i++) {
            if (this.preItemTop !== 0 && this.preItemTop !== this.lis[i].offsetTop) {
                this.numPreLine = i;
                break;
            }
            this.preItemTop = this.lis[i].offsetTop;

            if (this.opt.removeBtmGap) {
                if (this.resetLiFontSize) {
                    this.lis[i].style.fontSize = this.ulFontSize;
                }
            }
        }

        this.numLastLine = this.lis.length % this.numPreLine;
    };

    /**
     * Fill additional nodes to the last line
     */
    Justify.prototype.fillExtraNode = function() {
        if (!this.numLastLine) return;
        var newNode = document.createElement('li');
        newNode.className = "extra";
        var blankNode = document.createTextNode(' \n');
        var fragment = document.createDocumentFragment();

        for (var i = 0; i < this.numPreLine - this.numLastLine; i++) {
            fragment.appendChild(newNode.cloneNode());
            fragment.appendChild(blankNode.cloneNode());
        }

        this.ul.appendChild(fragment);
        this.extraLis = this.ul.querySelectorAll('.extra');
    };

    /**
     * Remove extra nodes
     */
    Justify.prototype.removeExtraLis = function() {
        var afterExtra = true;
        for (var i = this.ul.childNodes.length - 1; i >= 0; i--) {
            if (afterExtra && this.ul.childNodes[i].nodeType === 1 && this.ul.childNodes[i].className !== 'extra') {
                afterExtra = false;
            }
            if (afterExtra) {
                if (this.ul.childNodes[i + 1])
                    this.ul.childNodes[i + 1].parentNode.removeChild(this.ul.childNodes[i + 1]);
            }
        }
    };

    /**
     * To register event listeners
     */
    Justify.prototype.eventsRegister = function(dom) {
        var _this = this;
        window.addEventListener('orientationchange', function() {
            _this.init(dom);
        }, false);
    };

    /**
     * Justify initializer
     *
     * @param DOM element
     * @param {Object} settings
     */
    Justify.prototype.init = function(dom, options) {
        if (typeof dom != 'object') return;

        if (this.extraLis.length) {
            this.removeExtraLis();
        }

        if (options && typeof options === 'object') {
            for (var key in options) {
                this.opt[key] = options[key];
            }
        }

        this.ul = dom;
        this.lis = dom.querySelectorAll('li');
        if (this.lis.length === 0) return;

        if (this.opt.removeBtmGap) {
            this.ulFontSize = getComputedStyle(this.ul).fontSize;
            this.ul.style.fontSize = '0px';
            if (this.lis[0].style.fontSize === '') {
                this.resetLiFontSize = getComputedStyle(this.lis[0]).fontSize == this.ulFontSize ? true : false;
            }
        }

        this.calcLastLineNum();
        this.fillExtraNode();
        this.eventsRegister(dom);
    };

    /**
     * To generate an instance of Justify
     *
     * @param DOM element
     * @param {Object} settings
     */
    Justify.apply = function(dom, options) {
        return new Justify(dom, options);
    };

    if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
        define(function() {
            return Justify;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = Justify.applay;
        module.exports.Justify = Justify;
    } else {
        window.Justify = Justify;
    }

})(window, document);
