import { CloudUpload } from "@mui/icons-material";
import { Box, Button, Grid2, Typography } from "@mui/material";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useDropzone } from "react-dropzone";

type PhotoUploadWidgetProps = {
  handleUploadPhoto: (file: Blob) => void;
  loading: boolean;
};

const PhotoUploadWidget = ({
  handleUploadPhoto,
  loading,
}: PhotoUploadWidgetProps) => {
  const [files, setFiles] = useState<object & { preview: string }[]>([]);
  const cropperRef = useRef<ReactCropperElement>(null);
  // This useEffect is used to revoke the object URLs created for the uploaded files when the component unmounts or when the files change.
  // This is important to avoid memory leaks by releasing the resources associated with the object URLs.
  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file as Blob) })
      )
    );
  }, []);

  const onCrop = useCallback(() => {
    const cropper = cropperRef.current?.cropper;
    cropper?.getCroppedCanvas().toBlob((blob) => {
      handleUploadPhoto(blob as Blob);
    });
  }, [handleUploadPhoto]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Fragment>
      <Grid2 container spacing={3}>
        <Grid2 size={4}>
          <Typography variant="overline" color="secondary">
            Step 1 - Add photo
          </Typography>
          <Box
            {...getRootProps()}
            sx={{
              border: "dashed 3px #eee",
              borderColor: isDragActive ? "green" : "#eee",
              borderRadius: "5px",
              paddingTop: "30px",
              textAlign: "center",
              height: "280px",
            }}
          >
            <input {...getInputProps()} />
            <CloudUpload sx={{ fontSize: 80 }} />
            <Typography variant="h5">Drop image here</Typography>
          </Box>
        </Grid2>
        <Grid2 size={4}>
          <Typography variant="overline" color="secondary">
            Step 2 - Resize image
          </Typography>
          {files[0]?.preview && (
            <Cropper
              src={files[0]?.preview}
              style={{ height: 300, width: "90%" }}
              initialAspectRatio={1}
              aspectRatio={1}
              preview=".img-preview"
              guides={false}
              viewMode={1}
              background={false}
              ref={cropperRef}
            />
          )}
        </Grid2>
        <Grid2 size={4}>
          {files[0]?.preview && (
            <>
              <Typography variant="overline" color="secondary">
                Step 3 - Preview & upload
              </Typography>
              <div
                className="img-preview"
                style={{ width: 300, height: 300, overflow: "hidden" }}
              />
              <Button
                sx={{ my: 1, width: 300 }}
                onClick={onCrop}
                variant="contained"
                color="secondary"
                disabled={loading}
              >
                Upload
              </Button>
            </>
          )}
        </Grid2>
      </Grid2>
    </Fragment>
  );
};

export default PhotoUploadWidget;
