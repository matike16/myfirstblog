window.onload = function () {
    // 获取左右切换按钮和图片列表
    let oLeft = document.querySelector(".left");
    let oRight = document.querySelector(".right");
    let oImgList = document.querySelector(".img-list");
    // 克隆第一张图片
    let clonefirstImg = oImgList.firstElementChild.cloneNode();
    // 将克隆的图片添加到图片列表末尾
    oImgList.appendChild(clonefirstImg);
    // 代表图片的索引，当前第几张（0>第一张）
    let index = 0;
    // 设置函数节流锁 （在一段时间只能执行一次操作，不让用户频繁点击）
    let lock = true;
    function handleRightBtn() {
        if (!lock)
            return;
        index++;
        oImgList.style.left = index * -100 + "%";
        oImgList.style.transition = "0.5s ease";
        if (index === 5) {
            index = 0;
            setTimeout(() => {
                oImgList.style.left = 0;
                // 取消过渡，500毫秒过后切换第一张
                oImgList.style.transition = "none";
            }, 500);
        }
        // 设置小圆点的高亮
        setCircles();
        // 关锁
        lock = false;
        setTimeout(() => {
            // 500毫秒后开锁
            lock = true;
        }, 500);
    }
    // 右按钮实现
    oRight.addEventListener("click", handleRightBtn);
    // 左按钮实现
    oLeft.addEventListener("click", () => {
        if (!lock) return;
        index--;
        // oImgList.style.left = index * -900 + "px";
        if (index === -1) {
            oImgList.style.left = 5 * -100 + "%";
            oImgList.style.transition = "none";
            index = 4;
            setTimeout(() => {
                oImgList.style.left = index * -100 + "%";
                oImgList.style.transition = "0.5s ease";
            }, 0);
        } else {
            oImgList.style.left = index * -100 + "%";
        }
        // 设置小圆点的高亮
        setCircles();
        lock = false;
        setTimeout(() => {
            lock = true;
        }, 500);
    });
    // 获取5个小圆点
    // 定义常量,获取5个小圆点（不可改变）
    const circles = document.querySelectorAll(".circle");
    // 小圆点高亮的显示
    function setCircles() {
        for (let i = 0; i < circles.length; i++) {
            // console.log(circles[i]);
            if (i === index) {
                circles[i].classList.add("active");
            } else {
                circles[i].classList.remove("active");
            }
        }
    };
    // 小圆点点击切换图片  使用事件代理
    const oCircle = document.querySelector(".circle-list");
    oCircle.addEventListener("click", (e) => {
        // 当我点击小圆点的时候
        // console.dir(e.target)获取节点信息
        if (e.target.nodeName.toLowerCase() === "li") {
            // 当前元素的data-n对应的值和index一一对应
            const n = Number(e.target.getAttribute("data-n"));
            index = n;
            // 设置小圆点的高亮
            setCircles();
            oImgList.style.left = index * -100 + "%";
        }
    });
    // 自动轮播（相当于设置定时器去自动点击右按钮）
    let autoplay = setInterval(handleRightBtn, 2500);
    const oWrap = document.getElementById("wrap");
    // 移入停止轮播
    oWrap.addEventListener("mouseenter", () => {
        clearInterval(autoplay);
    });
    // 移出继续轮播
    oWrap.addEventListener("mouseleave", () => {
        // 设表先关，避免堆积
        clearInterval(autoplay);
        autoplay = setInterval(handleRightBtn, 2500);
    });
}