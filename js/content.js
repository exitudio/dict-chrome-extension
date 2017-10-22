var popupWidth = (400 + 5 + 5) * 2; //include border
var protocol = location.protocol.indexOf('https')!=-1?'https':'http'; //to avoid localhost protocal = http://localhost:3000 instead of just http
var isShowingPopup = false;
$(document).ready(function () {
    $(window).mouseup(function (event) {
        if (!event.altKey || !window.getSelection) return;
        var selectTextElement = window.getSelection();
        var selectText = selectTextElement.toString();
        selectText = selectText.toLowerCase().trim();
        if(!selectText) return;

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
        x = Math.floor(x);
        y = Math.floor(y);

        $('html').append('<div id="exit-dick" >' +
            '   <div id="dict-api" class="exit-card">' +
            '       <div id="dict-head">' +
            '           Dictionary API' +
            '       </div>' +
            '       <div id="dictapi-content" class="content-area"/>' +
            '   </div>' +
            '   <div class="exit-card">' +
            '       <div id="longdo-head">' +
            '           <img src="https://dict.longdo.com/download/search_box/images/longdo-dict-small.png" />' +
            '       </div>' +
            // '<object class="content-area" type="text/html" data="https://dict.longdo.com/mobile.php?search=' + selectText + '" ></object>' +
            '       <iframe src="https://dict.longdo.com/mobile.php?search=' + selectText + '" width="400" height="200" frameBorder="0"/>' +
            '   </div>' +
            '   <div id="urban" class="exit-card">' +
                    urbanLogo+
            '       <div id="urban-content" class="content-area"/>' +
            '   </div>' +
            '</div>');
        // $("#test-load").load('https://dict.longdo.com/mobile.php?search='+selectText);
        loadDictAPI(selectText);
        function loadDictAPI(text){
            // console.log('load :_'+text+'_');
            $('#dict-api .content-area').html('<b>'+text+'</b>');
            
            $.ajax({
                url: protocol+"://www.dictionaryapi.com/api/v1/references/collegiate/xml/"+text+"?key=18bf07d1-bc75-4201-9498-3a2c5532c2a7",
            }).done(function (xml) {
                // console.log('data:', xml);
                //check exact word or suggest word
                if($(xml).find('entry').length===0){
                    console.log("$(xml).find('suggestion'):",xml);
                    var suggestions = $(xml).find('suggestion');
                    //check any suggest word
                    if(suggestions[0]){
                        var suggestText = suggestions[0].textContent;
                        //if there is the word inside of suggestion use that
                        //I think this is useless but left it doesn't hurt.
                        for(var i=0; i<suggestions.length; i++){
                            if(suggestions[i].textContent.indexOf(selectText)){
                                suggestText = suggestions[i].textContent;
                                break;
                            }
                        }
                        loadDictAPI(suggestText);
                    }else{
                        //no result
                        $('#dict-api .content-area').append(
                            '<hr/>'+
                            '<div>no result...</div>'
                        );
                    }
                }else{
                    // console.log("$(xml).find('entry')_:",$(xml).find('def > dt'));
                    // console.log("$(xml).find('entry')+:",$(xml).find('entry')[0].children);
                    var allDefinition = $(xml).find('def > dt');

                    
                    for(var i=0; i<allDefinition.length; i++){
                        // console.log(i,':',allDefinition[i].textContent);
                        $('#dict-api .content-area').append(
                            '<hr/>'+
                            '<div>'+allDefinition[i].textContent+'</div>'
                        );
                    }
                }
                
            });
        }
        $.ajax({
            url: protocol+"://api.urbandictionary.com/v0/define?term="+selectText,
        }).done(function (data) {
            // console.log('data:', data);
            var headText = data.list.length>0? data.list[0].word : selectText;
            var contentText = data.list.length>0? data.list[0].definition : 'no result...';
            $('#urban .content-area').html(
                '<b>'+headText+'</b>'+
                '<hr class="hr"/>'+
                '<div>'+contentText+'</div>'
            );
        });

        $('#exit-dick').css({ /* left: x + 'px', */ top: y + 'px' })
        // console.log('oRect:', oRect);

        isShowingPopup = true;
        $('.exit-card').click(function(event){
            event.stopPropagation();
            // event.preventDefault();
        });
    });
    $(window).click(function (e) {
        if (!isShowingPopup) {
            $('#exit-dick').remove();
        }
        isShowingPopup = false;
    });
    /* $(window).resize(function () {
        $('#exit-dick').remove();
    }); */
    
});