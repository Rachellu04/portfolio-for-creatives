gsap.registerPlugin(Draggable, InertiaPlugin);

let clampSkew = gsap.utils.clamp(-2, 2);

class DraggableImg {
  constructor(Image) {
    const proxy = document.createElement("div"),
      tracker = InertiaPlugin.track(proxy, "x")[0],
      skewTo = gsap.quickTo(Image, "skewX"),
      updateSkew = () => {
        let vx = tracker.get("x");
        skewTo(clampSkew(vx / -200));
        if (!vx && !this.drag.isPressed) gsap.ticker.remove(updateSkew);
      },
      align = () =>
        gsap.set(proxy, {
          attr: { class: "proxy" },
          x: gsap.getProperty(Image, "x"),
          y: gsap.getProperty(Image, "y"),
          width: Image.offsetWidth,
          height: Image.offsetHeight,
          position: "absolute",
          pointerEvents: "none",
          top: Image.offsetTop,
          left: Image.offsetLeft,
        }),
      xTo = gsap.quickTo(Image, "x", { duration: 0.25 }),
      yTo = gsap.quickTo(Image, "y", { duration: 0.25 });

    // make the proxy sit right on top and add it to the DOM so that bounds work
    align();
    Image.parentNode.append(proxy);

    window.addEventListener("resize", align);

    this.drag = Draggable.create(proxy, {
      type: "x,y",
      trigger: Image,
      bounds: ".content-drag-area",
      edgeResistance: 0.5,
      onPressInit() {
        align();
        xTo.tween.pause();
        yTo.tween.pause();
        gsap.ticker.add(updateSkew);
      },
      onPress() {
        Image.style.zIndex = proxy.style.zIndex;
      },
      onDrag() {
        xTo(this.x);
        yTo(this.y);
      },
      onThrowUpdate() {
        xTo(this.x);
        yTo(this.y);
      },
      inertia: true,
    })[0];
  }
}

let draggables = gsap.utils
  .toArray(".img-drag")
  .map((el) => new DraggableImg(el));

//randomize

const area = document.querySelector(".content-drag-area");
const items = document.querySelectorAll(".item");

items.forEach((item) => {
  const maxX = area.clientWidth - item.offsetWidth;
  const maxY = area.clientHeight - item.offsetHeight;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  item.style.left = x + "px";
  item.style.top = y + "px";
});
