(function(window){
    if(!window.__likelion){
        throw new Error("[likelion][popup] likelion 모듈이 없습니다.");
    }
    else if(!window.jQuery){
        throw new Error("[likelion][popup] jQuery가 없습니다.");
    }
    else{
        window.__likelion.ext('popup' , function(){
            // popup 스크립트 시작
            console.log('[likelion][popup] loaded.');

            let _cover = $("<div></div>");
            _cover.addClass("likelion-popup-cover").addClass("hide");
            
            let _templates = {
                dom : -1,
                load : function(url){
                    return $.get(url)
                    .then(function(res){                        
                        // console.log(res);
                        _templates.dom = $(res);
                        $('body')
                        .prepend(_templates.dom)
                        .prepend(_cover);
                        
                        return _templates.dom;
                    });
                },
                open : function(url , bind){
                    if(_templates.dom === -1){
                        _templates.load(url)
                        .then(bind)
                        .then(function(){
                            if(_templates.dom.hasClass("hide")){
                                // 왠지 synchronous하게 작동되지 않음
                                // setTimeout으로 일단 해결해둠
                                setTimeout(() => {
                                    _templates.dom.removeClass("hide");
                                    _cover.removeClass("hide");
                                }, 0);
                            }
                        });
                    }
                    else{
                        if(_templates.dom.hasClass("hide")){
                            _templates.dom.removeClass("hide");
                            _cover.removeClass("hide");
                        }
                        else{
                            console.warn("[likelion][popup] 팝업이 이미 열려있습니다");
                        }
                    }
                },
                close : function(){
                    if(!_templates.dom.hasClass("hide")){
                        _templates.dom.addClass('hide');
                        _cover.addClass('hide');
                    }
                    else{
                        console.warn("[likelion][popup] 열려있는 팝업이 없습니다");
                    }
                }
            }

            return {
                open : function(url , bind){
                    _templates.open(url , bind);
                },
                close : function(){
                    _templates.close();
                }
            };
        });
    }
})(window);

