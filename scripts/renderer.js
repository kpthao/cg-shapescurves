class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d');
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(this.ctx);
                break;
            case 1:
                this.drawSlide1(this.ctx);
                break;
            case 2:
                this.drawSlide2(this.ctx);
                break;
            case 3:
                this.drawSlide3(this.ctx);
                break;
        }
    }

    //Draw Rectangle
    // ctx:          canvas context
    drawSlide0(ctx) {
        let left_bottom = {x:100, y:300};
        let right_top = {x:700, y:500};
        let color = [255, 0, 255, 255];
        this.drawRectangle(left_bottom, right_top, color, ctx);

        if(this.showPoints.flag == true){
            
        }
    }

    //Draw Circle
    // ctx:          canvas context
    drawSlide1(ctx) {
        let center = {x: 300, y: 300};
        let radius = 100;
        let color = [255, 0, 0, 255];
        this.drawCircle(center, radius, color, ctx);
    }

    //Draw Bezier Curve
    // ctx:          canvas context
    drawSlide2(ctx) {
        let point0 = {x:100, y:100};    //beginning point
        let point1 = {x:150, y:300};    //control point 1
        let point2 = {x:600, y:250};    //control point 2
        let point3 = {x:500, y:100};    //end point
        let color = [0, 255, 0, 255];
        this.drawBezierCurve(point0, point1, point2, point3, color, ctx);
    }

    //Draw Name
    // ctx:          canvas context
    drawSlide3(ctx) {
        this.drawName;
    }

    drawName(){
        let minimum_y_height = 100;
        let maximum_y_height = 300;
        let color = [255, 255, 255, 255];
        let point0 = {x:0, y:0};
        let point1 = {x:0, y:0};
        let point2 = {x:0, y:0};
        let point3 = {x:0, y:0};
        let center = {x:0, y:0};
        let radius = 100;

        //draw K
        point0 = {x:100, y:minimum_y_height};
        point1 = {x:100, y:maximum_y_height};
        midpoint = {x:point0.x, y:((point0.y + point1.y)/2)};
        point2 = {x:300,y:maximum_y_height};
        point3 = {x:300,y:minimum_y_height};
        this.drawLine(point0, point1, color, ctx);
        this.drawLine(midpoint, point2, color, this.ctx);
        this.drawLine(midpoint, point3, color, this.ctx);

        //draw P
        point0 = {x:400, y:minimum_y_height};
        point1 = {x:400, y:maximum_y_height};
        middle_curve = {x:600, y:((point0.y + point1.y)/2)};
        this.drawLine(point0, point1, color, this.ctx);
        this.drawBezierCurve(point0, middle_curve, middle_curve, point1, color, this.ctx);

        //draw T
        point0 = {x:500, y:maximum_y_height};
        point1 = {x:700, y:maximum_y_height};
        midpoint = {x:((point0.x + point1.x)/2), y:maximum_y_height};
        point2 = {x:midpoint, y:minimum_y_height};
        this.drawLine(point0, point1, color, this.ctx);
        this.drawLine(midpoint, point2, color, this.ctx);

        //draw h
        point0 = {x:800, y:maximum_y_height};
        point1 = {x:800, y:minimum_y_height};
        middle_curve = {x:((point0.x+point1.x)/2), y:((point0.y+point1.y)/2)};
        point2 = {x:1000, y:minimum_y_height};
        this.drawLine(point0, point1, color, this.ctx);
        this.drawBezierCurve(point1, middle_curve, middle_curve, point2, color, this.ctx);

        //draw a
        point0 = {x:1300, y:maximum_y_height};
        point1 = {x:1300, y:minimum_y_height};
        center = {x:(point0.x-100), y:(point0.y-100)};
        this.drawLine(point0, point1, color, this.ctx);
        this.drawCircle(center, radius, color, this.ctx);

        //draw o
        center = {x:(point0 + 200), y:(point0.y-100)};
        this.drawCircle(center, radius, color, this.ctx);
    }

    // left_bottom:  object ({x: __, y: __})
    // right_top:    object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawRectangle(left_bottom, right_top, color, ctx) {
        // let right_bottom = [right_top.x, left_bottom.y];
        let right_bottom = {x:right_top.x, y:left_bottom.y};
        // let right_bottom = [right_top.getElementById(0), left_bottom.getElementById(1)];
        // let left_top = [left_bottom.x, right_top.y];
        let left_top = {x:left_bottom.x, y:right_top.y};
        // let left_top = [left_bottom.getElementById(0), right_top.getElementById(1)];

        this.drawLine(left_bottom, left_top, color, ctx);       //draw left side
        this.drawLine(left_top, right_top, color, ctx);         //draw top
        this.drawLine(right_top, right_bottom, color, ctx);     //draw right side
        this.drawLine(right_bottom, left_bottom, color, ctx);   //draw bottom
    }

    // center:       object ({x: __, y: __})
    // radius:       int
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawCircle(center, radius, color, ctx) {
        //initializes the distance from the center of the circle
        // let center_x = center.x + radius;
        let center_x = center.x + radius;
        // let center_y = center.y;
        let center_y = center.y;
        let old_point = {x:center_x, y:center_y};
        //loop to change draw lines from degrees 0-360
        for(let degree = 0; degree < 360; degree++){
            //calculates new x and y coordinates
            let x = center_x + radius*Math.cos(degree);
            let y = center_y + radius*Math.sin(degree);
            //initializes new point
            let new_point = {x:x,y:y};
            //draws a line from the previous point to the new coordinate
            if(old_point.y != center_x && old_point.y != center_y){
                this.drawLine(old_point, new_point, color, ctx);
            }
            //the new line becomes the old line for the next iteration
            old_point = new_point;
        }
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // pt2:          object ({x: __, y: __})
    // pt3:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawBezierCurve(pt0, pt1, pt2, pt3, color, ctx) {
        // let pt0x = pt0.getElementById(0);
        // let pt1x = pt1.getElementById(0);
        // let pt2x = pt2.getElementById(0);
        // let pt3x = pt3.getElementById(0);
        // let pt0y = pt0.getElementById(1);
        // let pt1y = pt1.getElementById(1);
        // let pt2y = pt2.getElementById(1);
        // let pt3y = pt3.getElementById(1);

        let x = 0;
        let y = 0;
        let t = 0;
        //let points = {x:0, y:0};
        let points = [];
        let counter = 1 / this.num_curve_sections;
        
        for(let index = 0; index < this.num_curve_sections+1; index++){
            // let x = (1-t)^3*pt0x + 3*(1-t)^2*t*pt1x + 3*(1-t)*t^2*pt2x + t^3*pt3x;
            // let y = (1-t)^3*pt0y + 3*(1-t)^2*t*pt1y + 3*(1-t)*t^t*pt2y + t^3*pt3y;

            x = (1-t)^3*pt0.x + 3*(1-t)^2*t*pt1.x + 3*(1-t)*t^2*pt2.x + t^3*pt3.x;
            y = (1-t)^3*pt0.y + 3*(1-t)^2*t*pt1.y + 3*(1-t)*t^t*pt2.y + t^3*pt3.y;

            points.push({x:x, y:y});
            t = t + counter;
        }
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawLine(pt0, pt1, color, ctx)
    {
        ctx.strokeStyle = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + (color[3]/255.0) + ')';
        ctx.beginPath();
        ctx.moveTo(pt0.x, pt0.y);
        ctx.lineTo(pt1.x, pt1.y);
        ctx.stroke();
    }
};
