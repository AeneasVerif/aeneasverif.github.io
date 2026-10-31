(() => {
  const canvas = document.getElementById("hero-gears");
  const context = canvas.getContext("2d");
  if (!context) return;

  const palette = getComputedStyle(canvas);
  const gearColor = (name) => palette.getPropertyValue("--gear-" + name).trim();
  const fillOpacity = Number(palette.getPropertyValue("--gear-fill-alpha")) / 255;
  const tau = 2 * Math.PI;
  const contactAngle = Math.atan2(120, 160);
  const gears = [
    { x: 142, y: 144, teeth: 24, radius: 120, phase: contactAngle, color: gearColor("primary") },
    { x: 302, y: 264, teeth: 16, radius: 80, phase: contactAngle - 3 * Math.PI / 16, color: gearColor("secondary") },
    { x: 218, y: 376, teeth: 12, radius: 60, phase: contactAngle - Math.PI / 6, color: gearColor("tertiary") }
  ];

  function involute(radius, base) {
    const tangent = Math.sqrt((radius / base) ** 2 - 1);
    return tangent - Math.atan(tangent);
  }

  gears.forEach((gear) => {
    const base = gear.radius * Math.cos(25 * Math.PI / 180);
    const root = gear.radius - 12.5;
    const tip = gear.radius + 10;
    const half = Math.PI / (2 * gear.teeth) + involute(gear.radius, base);
    gear.vertices = [];

    function vertex(radius, angle) {
      gear.vertices.push({ x: radius * Math.cos(angle), y: radius * Math.sin(angle) });
    }

    for (let tooth = 0; tooth < gear.teeth; tooth++) {
      const angle = tooth * tau / gear.teeth;
      vertex(root, angle - Math.PI / gear.teeth);
      vertex(root, angle - half);
      for (let step = 0; step <= 6; step++) {
        const radius = base + (tip - base) * step / 6;
        vertex(radius, angle - half + involute(radius, base));
      }
      for (let step = 6; step >= 0; step--) {
        const radius = base + (tip - base) * step / 6;
        vertex(radius, angle + half - involute(radius, base));
      }
      vertex(root, angle + half);
      vertex(root, angle + Math.PI / gear.teeth);
    }
  });

  function draw(driverAngle) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    context.scale(canvas.width / 420, canvas.height / 470);
    gears.forEach((gear, index) => {
      // Adjacent gears share pitch velocity, but rotate in opposite directions.
      const angle = gear.phase + (index === 1 ? -1 : 1) * driverAngle * 24 / gear.teeth;
      const cosine = Math.cos(angle);
      const sine = Math.sin(angle);
      const project = (point) => ({
        x: gear.x + point.x * cosine - point.y * sine,
        y: gear.y + point.x * sine + point.y * cosine
      });

      context.beginPath();
      gear.vertices.forEach((point, vertex) => {
        const position = project(point);
        if (vertex === 0) context.moveTo(position.x, position.y);
        else context.lineTo(position.x, position.y);
      });
      context.closePath();
      const hole = gear.radius * 0.35;
      context.moveTo(gear.x + hole, gear.y);
      context.arc(gear.x, gear.y, hole, 0, tau);
      context.fillStyle = gear.color;
      context.globalAlpha = fillOpacity;
      context.fill("evenodd");
      context.globalAlpha = 1;
      context.strokeStyle = gear.color;
      context.lineWidth = 1.5;
      context.stroke();

      const hub = gear.radius * 0.12;
      context.beginPath();
      context.arc(gear.x, gear.y, hub, 0, tau);
      for (let spoke = 0; spoke < 3; spoke++) {
        const direction = angle + spoke * tau / 3;
        context.moveTo(gear.x + hub * Math.cos(direction), gear.y + hub * Math.sin(direction));
        context.lineTo(gear.x + hole * Math.cos(direction), gear.y + hole * Math.sin(direction));
      }
      context.stroke();

    });
    context.restore();
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let frame;
  let driverAngle = 0;
  let previousTime;

  function animate(time) {
    if (previousTime !== undefined) driverAngle += (time - previousTime) * tau / 24000;
    previousTime = time;
    draw(driverAngle);
    frame = requestAnimationFrame(animate);
  }

  function updateMotion() {
    cancelAnimationFrame(frame);
    previousTime = undefined;
    draw(driverAngle);
    if (!reducedMotion.matches && !document.hidden) frame = requestAnimationFrame(animate);
  }

  new ResizeObserver(() => {
    const ratio = window.devicePixelRatio || 1;
    canvas.width = Math.round(canvas.clientWidth * ratio);
    canvas.height = Math.round(canvas.clientHeight * ratio);
    draw(driverAngle);
  }).observe(canvas);

  reducedMotion.addEventListener("change", updateMotion);
  document.addEventListener("visibilitychange", updateMotion);
  updateMotion();
})();
