var characterGestures = {
	//WAVE
	//-------------------------------
	//  A gesture where the character
	//waves their outer hand as if
	//to say "hello" or "goodbye".
	wave : {
		innerArm : {
			rotationOffset : -25,
			rotationRange : 10,
			rotationSpeed : 0
		},
		outerArm : {
			rotationOffset : -170,
			rotationRange : 40,
			rotationSpeed : 3
		}
	},
	pointForward : {
		innerArm : {
			rotationOffset : -120,
			rotationRange : 10,
			rotationSpeed : 0
		},
		outerArm : {
			rotationOffset : 35,
			rotationRange : 10,
			rotationSpeed : 0
		}
	},
	lookAround : {
		innerArm : {
			rotationOffset : -110,
			rotationRange : 10,
			rotationSpeed : 0.05
		},
		outerArm : {
			rotationOffset : 110,
			rotationRange : 10,
			rotationSpeed : 0.05
		}
	},
	victory : {
		innerArm : {
			rotationOffset : -170,
			rotationRange : 20,
			rotationSpeed : 0.5
		},
		outerArm : {
			rotationOffset : 170,
			rotationRange : 20,
			rotationSpeed : 0.5
		}
	}
}