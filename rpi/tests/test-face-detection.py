# model structure: https://github.com/opencv/opencv/raw/3.4.0/samples/dnn/face_detector/deploy.prototxt
# pre-trained weights: https://github.com/opencv/opencv_3rdparty/raw/dnn_samples_face_detector_20170830/res10_300x300_ssd_iter_140000.caffemodel
import cv2
import pandas as pd
import time

cam = cv2.VideoCapture(0)

detector = cv2.dnn.readNetFromCaffe(
    "./face-detection/deploy.prototxt.txt", "./face-detection/res10_300x300_ssd_iter_140000.caffemodel")

target_size = (300, 300)

while True:
    start = time.time()
    check, frame = cam.read()

    base_img = frame.copy()
    original_size = frame.shape

    # print("original image size: ", original_size)
    frame = cv2.resize(frame, target_size)
    aspect_ratio_x = (original_size[1] / target_size[1])
    aspect_ratio_y = (original_size[0] / target_size[0])
    # print("aspect ratios x: ", aspect_ratio_x, ", y: ", aspect_ratio_y)
    imageBlob = cv2.dnn.blobFromImage(image=frame)
    detector.setInput(imageBlob)
    detections = detector.forward()
    detections_df = pd.DataFrame(detections[0][0], columns=[
                                 "img_id", "is_face", "confidence", "left", "top", "right", "bottom"])

    # 0: background, 1: face
    detections_df = detections_df[detections_df['is_face'] == 1]
    detections_df = detections_df[detections_df['confidence'] >= 0.90]
    detections_df.head()

    for i, instance in detections_df.iterrows():
        # print(instance)

        confidence_score = str(round(100*instance["confidence"], 2))+" %"

        left = int(instance["left"] * 300)
        bottom = int(instance["bottom"] * 300)
        right = int(instance["right"] * 300)
        top = int(instance["top"] * 300)

        # low resolution
        #detected_face = image[top:bottom, left:right]

        # high resolution
        detected_face = base_img[int(top*aspect_ratio_y):int(
            bottom*aspect_ratio_y), int(left*aspect_ratio_x):int(right*aspect_ratio_x)]

        if detected_face.shape[0] > 0 and detected_face.shape[1] > 0:

            #plt.figure(figsize = (3, 3))

            # low resolution
            #cv2.putText(image, confidence_score, (left, top-10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)
            # cv2.rectangle(image, (left, top), (right, bottom), (255, 255, 255), 1) #draw rectangle to main image

            # high resolution
            cv2.putText(base_img, confidence_score, (int(left*aspect_ratio_x), int(
                top*aspect_ratio_y-10)), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)
            cv2.rectangle(base_img, (int(left*aspect_ratio_x), int(top*aspect_ratio_y)), (int(right*aspect_ratio_x),
                          int(bottom*aspect_ratio_y)), (255, 255, 255), 1)  # draw rectangle to main image

    cv2.imshow('video', base_img)

    key = cv2.waitKey(1)
    if key == 27:
        break

    stop = time.time()
    print(round(1000*(stop - start)), 'ms')

cam.release()
cv2.destroyAllWindows()
