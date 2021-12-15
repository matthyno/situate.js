const BLANK2 = new Vector2(0,0);
class Object {
    constructor(mass, size, pos, properties) {
        this.m = mass;
        this.s = size;
        this.dp = pos;
        this.p = pos;
        this.prop = properties;
        this.v = new Vector2(0,0);
    }
    accelerate(velocity) {
        this.v = this.v.add(velocity);
    }
    reset() {
        this.v = BLANK2;
        this.p = this.dp;
    }
    projectileMotion(time) {
        var n=projMotion(this.p,this.v,this.m,...this.prop,time);
        this.v=n[0];
        this.p=n[1];
        return n;
    }
    elasticCollision(otherObject) {
        var d = this.p;
        var d2 = otherObject.p;
        var v = this.v;
        var v2 = otherObject.v;
        var m = this.m;
        var m2 = otherObject.m;
        var collision_results;
        if(didCollide(d, d2, this.s)){
            //console.log(v, v2);
            var combined_m = new Vector2(m2.x, m.x);
            var angle_of_collision = new Vector1(rtd(angle(d.x, d.y, d2.x, d2.y)));
            //console.log(angle_of_collision);
            var v_angle = new Vector1(rtd(angle(d.x, d.y, d.x+v.x, d.y+v.y)));
            var v2_angle = new Vector1(rtd(angle(d2.x, d2.y, d2.x+v2.x, d2.y+v2.y)));
            collision_results = elasticCollision(d, d2, v, v2, combined_m, new Vector2(v_angle.x, v2_angle.x), angle_of_collision);
            //collision_results[0] = BLANK2.sub(collision_results[0])
            //collision_results[1] = BLANK2.sub(collision_results[1])
        } else {
            collision_results = [v, v2];
        }
        //this.projectileMotion(time);
        //otherObject.projectileMotion(time);
        return collision_results;
    }
    draw(screen, color) {
        var tmp = screen.ctx.fillStyle;
        screen.ctx.fillStyle = color;
        screen.ctx.fillRect(this.p.x, (-this.p.y)+screen.canv.height, this.s.x, this.s.x);
        screen.ctx.fillStyle = tmp;
    }
}
class Screen {
    constructor(id) {
        this.id = id;
        this.canv = document.getElementById(id);
        this.ctx = this.canv.getContext("2d");
    }
    clear() {
        this.ctx.clearRect(0, 0, this.canv.width, this.canv.height);
    }
}
