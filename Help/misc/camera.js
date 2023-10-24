function Camera(input) {
    // The following two parameters will be used to automatically create the cameraWorldMatrix in this.update()
    this.cameraYaw = 0;
    this.cameraPosition = new Vector3();

    this.cameraWorldMatrix = new Matrix4();

    // -------------------------------------------------------------------------
    this.getViewMatrix = function() {
        return this.cameraWorldMatrix.clone().inverse();
    }

    // -------------------------------------------------------------------------
    this.getForward = function() {
        // todo #6 - pull out the forward direction from the world matrix and return as a vector
        //         - recall that the camera looks in the "backwards" direction
        x = -this.cameraWorldMatrix.getElement(0,2);
        y = -this.cameraWorldMatrix.getElement(1,2);
        z = -this.cameraWorldMatrix.getElement(2,2);
        forward = new Vector3(x,y,z)
        forward.normalize();
        //console.log(forward);
        return forward;
      
      
    }
    // -------------------------------------------------------------------------
    this.update = function(dt) {
        var currentForward = this.getForward();
        console.log(currentForward)
        if (input.up) {
            let move = currentForward.clone().multiplyScalar(0.1);
            this.cameraPosition.add(move)
            //this.cameraWorldMatrix.makeTranslation(this.cameraPosition)
            // todo #7 - move the camera position a little bit in its forward direction
        }

        if (input.down) {
            let move = currentForward.clone().multiplyScalar(0.1);
            this.cameraPosition.add(move.multiplyScalar(-1))
            //this.cameraWorldMatrix.makeTranslation(this.cameraPosition)
            // todo #7 - move the camera position a little bit in its backward direction
        }

        if (input.left) {
            this.cameraYaw++;
            let move = new Matrix4();
            move.makeRotationY(this.cameraYaw);
            move.multiplyScalar(0.01);
            //this.cameraWorldMatrix.makeRotationY(move)
            // todo #8 - add a little bit to the current camera yaw
        }

        if (input.right) {
            this.cameraYaw--;
            let move = new Matrix4();
            move.makeRotationY(this.cameraYaw);
            move.multiplyScalar(0.01);
            this.cameraWorldMatrix.makeRotationY(move)
            // todo #8 - subtract a little bit from the current camera yaw
        }

        this.cameraWorldMatrix.makeTranslation(this.cameraPosition)
        // todo #7 - create the cameraWorldMatrix from scratch based on this.cameraPosition

        // todo #8 - create a rotation matrix based on cameraYaw and apply it to the cameraWorldMatrix
        // (order matters!)
    }
}

// EOF 00100001-10