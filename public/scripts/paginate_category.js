//public/scripts/paginate_category.js

let page = 0

function paginate(lastKey, category){
    $('.pagination img').attr('src', '/images/loading.gif')
    if(page === 0){
        page = lastKey
    }

    if(page){
        $.post(`/category/paginate`,{page,category},function(data, status){
            page = data.lastKey
            appendItem(data.items, data)
        })
    }else{
        setTimeout(() => {
            $('.pagination img').attr('src', '/images/load-more.png')
        }, "1000")
    }
}

function appendItem(items, data){
    let html = ''
    
    if(items){
        for(const post of items){
            html += `<div class="thumb">`
            html += `<a class="wrapper" href="/post/${post.key}">`
                html += `<img src="${post.thumb}" />`
                    if(post.videos){
                        if((post.videos !== "")&&(post.videos !== "[]")){
                        html += `<img class="play-icon" src="/images/play.png" />`
                    }
                }
            html += `</a>`
            html += `<p class="date">${(new Date(post.date)).toLocaleDateString("it-IT")}</p>`
            html += `<p class="title"><a href="/post/${post.key}">${post.title}</a></p>`
            html += `</div>`
        }
    }

    $('.Category .inner').append(html)
    
    $('.pagination img').attr('src', '/images/load-more.png')
}