import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  overlay: {
    position: "absolute",
    padding: 16,
    right: 0,
    left: 0,
    alignItems: "center"
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  captureButton: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 40
  },
  typeButton: {
    padding: 5
  },
  flashButton: {
    padding: 5
  },
  BackButton: {
    padding: 5,
  },
  NextButton: {
    padding: 5,
  },
  buttonsSpace: {
    width: 10
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  cancel: {
    position: "absolute",
    left: 50,
    bottom: 50,
    backgroundColor: "transparent"
  },
  accept: {
    position: "absolute",
    right: 50,
    bottom: 50,
    backgroundColor: "transparent"
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
  text: {
    marginLeft: 12,
    marginRight: 12,
    fontSize: 25,
    color: "#fff",
    textAlignVertical: "center",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  textTitle: {
    marginLeft: 12,
    marginRight: 12,
    fontSize: 30,
    textAlignVertical: "center",
    alignContent: "center",
    alignItems: "center"
  },
  list: {
    flex: 1,
    flexDirection: "column",
    alignContent:"flex-start",
    //flexWrap: 'wrap',
    backgroundColor: "#fff",
    padding: 20
  },
  imageViewContainer: {
    width: "30%",
    height: 70,
    width: 70,
    borderRadius: 35
  },
  textViewContainer: {
    flex: 1,
    height: 70,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "center"
  },
  textViewBox: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#47525e",
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  imageView: {
    height: 80,
    width: 80
  },
  imageViewTitle: {
    height: 100,
    width: 100,
    borderRadius: 50,
    resizeMode: "cover"
  },
  errorMessage: {
    flex: 0.3,
    //height:60,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#47525e",
    justifyContent: "center"
  },
  cameraRollContainer: {
    flex: 1,
    backgroundColor: '#F6AE2D',
  },
  cameraRollContent: {
    marginTop: 15,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});

export default styles;
