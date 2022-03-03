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
    }

    //Draw Circle
    // ctx:          canvas context
    drawSlide1(ctx) {
        let center = {x: 300, y: 300};
        let color_show_point = [0, 255, 0, 255];
        let radius = 100;
        let color = [255, 0, 0, 255];
        this.drawCircle(center, radius, color, ctx);

        if(this.show_points){
            let newColor = [0,0,255,255];
            let x = 0;
            let y = 0;
            let sections = 360/this.num_curve_sections;
            for(let degree = 0; degree < 360; degree = degree + sections){
                //calculates new x and y coordinates
                let x = center.x + (radius*Math.cos((degree * Math.PI/180)));
                let y = center.y + (radius*Math.sin((degree * Math.PI/180)));
                //adds new points into array
                this.drawCircle({x:x, y:y}, 5, newColor, ctx);
            }
        }
    }

    //Draw Bezier Curve
    // ctx:          canvas context
    drawSlide2(ctx) {
        let point0 = {x:100, y:100};    //beginning point
        let point1 = {x:150, y:250};    //control point 1
        let point2 = {x:600, y:200};    //control point 2
        let point3 = {x:500, y:50};    //end point
        let color = [0, 255, 0, 255];
        this.drawBezierCurve(point0, point1, point2, point3, color, ctx);

    }

    //Draw Name
    // ctx:          canvas context
    drawSlide3(ctx) {
        this.drawName(ctx);
    }

    drawName(ctx){
        let minimum_y_height = 100;
        let maximum_y_height = 300;
        let color = [0, 0, 0, 255];
        let point0 = {x:0, y:0};
        let point1 = {x:0, y:0};
        let point2 = {x:0, y:0};
        let point3 = {x:0, y:0};
        let center = {x:0, y:0};
        let radius = 50;
        let midpoint = 0;

        //draw K
        point0 = {x:50, y:minimum_y_height};
        point1 = {x:50, y:maximum_y_height};
        midpoint = {x:point0.x, y:((point0.y + point1.y)/2)};
        point2 = {x:150,y:maximum_y_height};
        point3 = {x:150,y:minimum_y_height};
        this.drawLine(point0, point1, color, ctx);
        this.drawLine(midpoint, point2, color, ctx);
        this.drawLine(midpoint, point3, color, ctx);

        //draw P
        point0 = {x:400/2, y:minimum_y_height};
        point1 = {x:400/2, y:maximum_y_height};
        midpoint = {x: 150, y: maximum_y_height/2};
        let middle_curve = {x:600/2, y:point1.y*(7/8)};
        this.drawLine(point0, point1, color, this.ctx);
        this.drawBezierCurve(point1, middle_curve, middle_curve, midpoint, color, this.ctx);

        // //draw T
        point0 = {x:350, y:maximum_y_height};
        point1 = {x:450, y:maximum_y_height};
        midpoint = {x:400, y:maximum_y_height};
        point2 = {x:400, y:minimum_y_height};
        console.log(midpoint);
        console.log(point2);
        this.drawLine(point0, point1, color, this.ctx);
        this.drawLine(midpoint, point2, color, this.ctx);

        // //draw h
        point0 = {x:500, y:maximum_y_height};
        point1 = {x:500, y:minimum_y_height};
        middle_curve = {x: 550, y:maximum_y_height*(2/3)};
        point2 = {x:600, y:minimum_y_height};
        this.drawLine(point0, point1, color, this.ctx);
        this.drawBezierCurve(point1, middle_curve, middle_curve, point2, color, this.ctx);

        // //draw a
        point0 = {x:700, y:maximum_y_height/2};
        point1 = {x:700, y:minimum_y_height};
        center = {x:650, y:maximum_y_height/2};
        this.drawLine(point0, point1, color, this.ctx);
        this.drawCircle(center, radius, color, this.ctx);

        // //draw o
        center = {x:750, y:maximum_y_height/2};
        this.drawCircle(center, radius, color, this.ctx);

        if(this.show_points){
            let newColor = [0,0,255,255];
            let x = 0;
            let y = 0;
            let sections = 360/this.num_curve_sections;
            for(let degree = 0; degree < 360; degree = degree + sections){
                //calculates new x and y coordinates
                let x = center.x + (radius*Math.cos((degree * Math.PI/180)));
                let y = center.y + (radius*Math.sin((degree * Math.PI/180)));
                //adds new points into array
                this.drawCircle({x:x, y:y}, 5, newColor, ctx);
            }
            center = {x: 650, y:maximum_y_height/2};
            for(let degree = 0; degree < 360; degree = degree + sections){
                //calculates new x and y coordinates
                let x = center.x + (radius*Math.cos((degree * Math.PI/180)));
                let y = center.y + (radius*Math.sin((degree * Math.PI/180)));
                //adds new points into array
                this.drawCircle({x:x, y:y}, 5, newColor, ctx);
            }
        }
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

        if(this.show_points){
            let color_show_point = [0, 255, 0, 255];
            this.drawCircle(left_bottom, 10, color_show_point, ctx);
            this.drawCircle(right_top, 10, color_show_point, ctx);
            this.drawCircle(right_bottom, 10, color_show_point, ctx);
            this.drawCircle(left_top, 10, color_show_point, ctx);
        }
    }

    // center:       object ({x: __, y: __})
    // radius:       int
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawCircle(center, radius, color, ctx) {
        let points = [];
        let sections = 360/this.num_curve_sections;
        for(let degree = 0; degree < 360; degree = degree + sections){
            //calculates new x and y coordinates
            let x = center.x + (radius*Math.cos((degree * Math.PI/180)));
            let y = center.y + (radius*Math.sin((degree * Math.PI/180)));
            //adds new points into array
            points.push({x:x,y:y});
        }
        this.drawLine(points[0], points[points.length-1], color, ctx);

        for(let index = 0; index < points.length-1; index++){
            this.drawLine(points[index], points[index+1], color, ctx);
        }

        // if(this.show_points){
        //     let newColor = [0,0,0,255];
        //     for(let index = 0; index < points.length; index++){
        //         this.drawRectangle(({x: (points[index].x-5), y: (points[index].y-5)}, ({x: (points[index].x+5), y:(points[index].y+5)}), newColor, ctx);
        //     }
        // }
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // pt2:          object ({x: __, y: __})
    // pt3:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawBezierCurve(pt0, pt1, pt2, pt3, color, ctx) {
        let points = [];
        let sections = 360/this.num_curve_sections;
        let counter = 1/this.num_curve_sections;
        let t = 0;
        let x = 0;
        let y = 0;

        for(let degree = 0; degree < 360; degree = degree + sections){
            //calculates new x and y coordinates
            x = Math.pow((1-t),3)*pt0.x + Math.pow((1-t),2)*3*t*pt1.x + Math.pow((1-t),1)*3*Math.pow(t,2)*pt2.x + Math.pow(t, 3)*pt3.x;
            y = Math.pow((1-t),3)*pt0.y + Math.pow((1-t),2)*3*t*pt1.y + Math.pow((1-t),1)*3*Math.pow(t,2)*pt2.y + Math.pow(t, 3)*pt3.y;
            //adds new points into array
            points.push({x:x,y:y});
            t = t + counter;
        }
        for(let index = 0; index < points.length-1; index++){
            this.drawLine(points[index], points[index+1], color, ctx);
        }

        if(this.show_points){
            let newColor = [255,0,0,255];
            for(let index = 0; index < points.length; index++){
                this.drawCircle(points[index], 10, newColor, ctx);
            }
            this.drawCircle(pt1, 5, newColor, ctx);
            this.drawCircle(pt2, 5, newColor, ctx);
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
