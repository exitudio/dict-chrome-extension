var popupWidth = 400 + 5 + 5; //include border
$(document).ready(function () {
    function get_selection() {
        var txt = '';
        if (window.getSelection) {
            txt = window.getSelection();
            var oRange = txt.getRangeAt(0); //get the text range
            var oRect = oRange.getBoundingClientRect();
        } else if (document.getSelection) {
            txt = document.getSelection();
        } else if (document.selection) {
            txt = document.selection.createRange().text;
        }
        return txt;
    }
    var isAltDown = false;
    var isShowingPopupt = false;
    $(window).keydown(function (e) {
        if (e.keyCode === 18) {
            isAltDown = true;
        }
    });
    $(window).keyup(function (e) {
        if (e.keyCode === 18) {
            isAltDown = false;
        }
    });
    $(window).mouseup(function(event){
        if(!isAltDown) return;
        if (!window.getSelection) return;
        var selectTextElement;
        selectTextElement = window.getSelection();
        var selectText = selectTextElement.toString();
        console.log('selectText:',selectText);
        $('#exit-dick').remove();

       

        var oRange;
        try {
            oRange = selectTextElement.getRangeAt(0); //get the text range
        } catch (e) {
            return;
        }
        var oRect = oRange.getBoundingClientRect();
        var x = oRect.x + window.scrollX + (oRect.width - popupWidth) / 2;
        var y = oRect.y + window.scrollY + oRect.height;
        if (x < window.scrollX) x = window.scrollX;
        else if (x + popupWidth > window.scrollX + $(window).width()) x = window.scrollX + $(window).width() - popupWidth;


        $('html').append('<div id="exit-dick" class="exit-card" >' +
            '<div id="longdo-head">' +
            '  <img src="https://dict.longdo.com/download/search_box/images/longdo-dict-small.png" />' +
            '</div>' +
            // '<div id="test-load" class="content-area"/>'+
            '<object class="content-area" type="text/html" data="https://dict.longdo.com/mobile.php?search=' + selectText + '" ></object>' +
            // '<iframe src="https://dict.longdo.com/mobile.php?search='+selectText+'" width="400" height="200" frameBorder="0"/>' +
            '<div id="longdo-head">' +
            '  <img src="https://dict.longdo.com/download/search_box/images/longdo-dict-small.png" />' +
            '</div>' +
            '</div>');
        // $("#test-load").load('https://dict.longdo.com/mobile.php?search='+selectText);
        
        
        $('#exit-dick').css({ left: x + 'px', top: y + 'px' })
        console.log('oRect:', oRect);

        isShowingPopupt = true;
    });
    $('body').click(function (e) {
        if(!isShowingPopupt){
            $('#exit-dick').remove();
        }
        isShowingPopupt =false;
    });
    $(window).resize(function () {
        $('#exit-dick').remove();
    })
    
    $.ajax({
        url: "https://api.urbandictionary.com/v0/define?term=exit",
      }).done(function(data) {
        console.log('data:',data);
      });
});

