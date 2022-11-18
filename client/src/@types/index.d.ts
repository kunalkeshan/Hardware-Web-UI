interface SingleImageUploadResponse {
	imageName: string;
	imageFile: any;
}

interface ModelPredictionData {
	class_name: string;
	accuracy: number;
	birad: {
		name: string;
		comments: string[];
	};
}
