var bag = document.getElementById("trash_item1");
var can = document.getElementById("trash_item2");
var bottle = document.getElementById("trash_item3");
var banana = document.getElementById("trash_item4");

var moving = false;
var image;

bag.ondragstart = function() { return false; }
can.ondragstart = function() { return false; }
bottle.ondragstart = function() { return false; }
banana.ondragstart = function() { return false; }

bag.addEventListener("mousedown", initialClick, false);
can.addEventListener("mousedown", initialClick, false);
bottle.addEventListener("mousedown", initialClick, false);
banana.addEventListener("mousedown", initialClick, false);

function move(e) {
    if (!moving) return;

    var newX = e.clientX - image.width / 2;
    var newY = e.clientY - image.height / 2;

    newX = Math.max(0, Math.min(newX, window.innerWidth - image.width - 10));
    newY = Math.max(0, Math.min(newY, window.innerHeight - image.height - 50));

    image.style.left = newX + "px";
    image.style.top = newY + "px";
}

function initialClick(e) {
    if (moving) {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", dropImage);
        moving = !moving;

        image.classList.add("fall-animation");

        image.style.top = window.innerHeight - 50 - image.clientHeight + "px";

        setTimeout(function () {
            image.classList.remove("fall-animation");
        }, 800);

        return;
    }

    moving = !moving;
    image = this;

    var newX = e.clientX - image.width / 2;
    var newY = e.clientY - image.height / 2;

    newX = Math.max(0, Math.min(newX, window.innerWidth - image.width - 10));
    newY = Math.max(0, Math.min(newY, window.innerHeight - image.height - 50));

    image.style.left = newX + "px";
    image.style.top = newY + "px";

    document.addEventListener("mousemove", move, false);
    document.addEventListener("mouseup", dropImage, false);
}

function dropImage() {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", dropImage);

    if (moving) {
        moving = !moving;
        image.classList.add("fall-animation");

        image.style.top = window.innerHeight - 50 - image.clientHeight + "px";

        setTimeout(function () {
            image.classList.remove("fall-animation");
        }, 800);
    }
}

