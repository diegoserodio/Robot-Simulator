class Agent{
  constructor(x, y, length, radius = 10){
    this.agentPos = createVector(x, y);
    this.agentVel = createVector(0,0);
    this.agentAcel = createVector(0,0);
    this.lPos = createVector(0, 0);
    this.rPos = createVector(0, 0);
    this.heading = createVector(x, y+1);
    this.length = length;
    this.radius = radius;
    this.render();
  }

  render(){
    //Angulo entre length e o eixo X
    let theta = radians(0);
    this.lPos.x = this.agentPos.x-(this.length/2)*cos(theta);
    this.lPos.y = this.agentPos.y-(this.length/2)*sin(theta);
    this.rPos.x = this.agentPos.x+(this.length/2)*cos(theta);
    this.rPos.y = this.agentPos.y+(this.length/2)*sin(theta);
    this.show();
  }

  move(vl_norm, vr_norm){
    let { agentPos, agentVel, lPos, rPos, length } = this;
    //Angulo entre heading e o length
    let phi = radians(0);
    let vlx = lPos.x+vl_norm*cos(phi+radians(90));
    let vly = lPos.y+vl_norm*sin(phi+radians(90));
    let vl = createVector(vlx, vly);
    let vrx = rPos.x+vr_norm*cos(phi+radians(90));
    let vry = rPos.y+vr_norm*sin(phi+radians(90));
    let vr = createVector(vrx, vry);

    // this.agentVel.x = (vl.x+vr.x)/2;
    // this.agentVel.y = (vl.y+vr.y)/2;

    let R_norm = -length*((vl_norm+vr_norm)/(vr_norm-vl_norm))/2;
    let R = createVector(agentPos.x+R_norm*cos(phi), agentPos.y+R_norm*sin(phi));

    let cp_l = createVector(R.x-lPos.x, R.y-lPos.y);
    let cp_r = createVector(R.x-rPos.x, R.y-rPos.y);
    vl.x += cp_l.x;
    vl.y += cp_l.y;
    vr.x += cp_r.x;
    vr.y += cp_r.y;

    // this.agentVel.x += R.x;
    // this.agentVel.y += R.y;

    fill('yellow');
    stroke('yellow');
    ellipse(R.x, R.y, 20, 20);
    stroke('blue');
  	strokeWeight(3);
    line(lPos.x, lPos.y, vl.x, vl.y);
    line(rPos.x, rPos.y, vr.x, vr.y);

    this.show();
  }

  update(vl, vr){
    let { agentVel, length } = this;
    // this.agentPos.x += agentVel.x;
    // this.agentPos.y += agentVel.y;
    // if(agentVel.mag() != 0)this.phi = agentVel.angleBetween(createVector(50,0)).toFixed(2);
    // this.lPos.x = this.agentPos.x-(length/2)*cos(this.phi);
    // this.lPos.y = this.agentPos.y-(length/2)*sin(this.phi);
    // this.rPos.x = this.agentPos.x+(length/2)*cos(this.phi);
    // this.rPos.y = this.agentPos.y+(length/2)*sin(this.phi);
    this.lPos.x += vl.x;
    this.lPos.y += vl.y;
    this.rPos.x += vr.x;
    this.rPos.y += vr.y;
    this.agentPos.x = (this.lPos.x+this.rPos.x)/2;
    this.agentPos.y = (this.lPos.y+this.rPos.y)/2;
  }

  show(){
    let { agentPos, lPos, rPos, radius } = this;
    stroke(255);
  	strokeWeight(4);
    fill(255);
    line(lPos.x, lPos.y, rPos.x, rPos.y);
    ellipse(lPos.x, lPos.y, radius);
    ellipse(rPos.x, rPos.y, radius);
    stroke('red');
    ellipse(agentPos.x, agentPos.y, radius);

    //Show vectors
    // stroke('green');
  	// strokeWeight(2);
    // line(0, 0, agentPos.x, agentPos.y);
    // line(0, 0, lPos.x, lPos.y);
    // line(0, 0, rPos.x, rPos.y);
  }
}
