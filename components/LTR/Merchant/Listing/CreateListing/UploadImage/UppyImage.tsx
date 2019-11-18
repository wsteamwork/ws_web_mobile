import { DetailsReducerAction } from '@/store/Redux/Reducers/LTR/CreateListing/Step2/details';
import { ImageReducerAction } from '@/store/Redux/Reducers/LTR/CreateListing/Step2/images';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';
import { createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import Uppy from '@uppy/core';
import '@uppy/core/dist/style.css';
import { Dashboard } from '@uppy/react';
import XHRUpload from '@uppy/xhr-upload';
import fetch from 'isomorphic-fetch';
import React, { FC, Fragment, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import 'uppy/dist/uppy.min.css';
interface IProps {
  classes?: any;
  label?: string;
  subLabel?: string;
  initImages?: any;
  height?: number;
  typeUpload: { type: any };
  maxImage?: number;
  type_txt?: string;
  typeImage?: number;
}

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    margin: {
      marginBottom: theme.spacing(4)
    },
    marginLabel: {
      marginBottom: theme.spacing(2)
    }
  })
);

const UppyImage: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { t } = useTranslation();
  const { label, subLabel, initImages, height, maxImage, typeUpload, type_txt, typeImage } = props;
  const dispatch = useDispatch<Dispatch<ImageReducerAction>>();
  const dispatch_detail = useDispatch<Dispatch<DetailsReducerAction>>();
  useEffect(() => {
    if (type_txt) {
      dispatch({ type: typeUpload.type, payload: { [`${type_txt}`]: { images: initImages } } });
    } else {
      dispatch({ type: typeUpload.type, payload: { images: initImages } });
    }
  }, []);

  useEffect(() => {
    if (initImages.length < 1) {
      dispatch_detail({ type: 'setDisableNext', payload: true });
    } else {
      dispatch_detail({ type: 'setDisableNext', payload: false });
    }
  }, [initImages]);

  const initImage = async (arrImg) => {
    for (let i = 0; i < arrImg.length; i++) {
      let img = `${IMAGE_STORAGE_LG}` + arrImg[i].name;
      await fetch(img)
        .then((res) => res.blob())
        .then((blob) => {
          uppy.addFile({
            name: arrImg[i].name,
            data: blob
          });
          uppy.getFiles().forEach((file) => {
            uppy.setFileState(file.id, {
              progress: { uploadComplete: true, uploadStarted: true }
            });
          });
        })
        .catch((err) => console.error(err));

    }
  };
  initImage(initImages);

  const uppy = Uppy({
    id: 'uppy',
    autoProceed: false,
    debug: true,
    locale: {
      strings: {
        addMore: 'Thêm ảnh',
        browse: 'thiết bị',
        uploadComplete: 'Hoàn thành tải lên',
        dropPasteImport: 'Kéo thả ảnh vào đây, %{browse} hoặc chọn từ',
        dropPaste: 'Kéo thả ảnh vào đây, hoặc chọn từ %{browse}',
        uploadingXFiles: {
          '0': 'Đang tải lên %{smart_count} ảnh',
          '1': 'Đang tải lên %{smart_count} ảnh',
          '2': 'Đang tải lên %{smart_count} ảnh'
        },
        filesUploadedOfTotal: {
          '0': '%{complete} của %{smart_count} ảnh đã được tải lên',
          '1': '%{complete} của %{smart_count} ảnh đã được tải lên',
          '2': '%{complete} của %{smart_count} ảnh đã được tải lên'
        },
        uploadXFiles: {
          '0': 'Tải lên',
          '1': 'Tải lên',
          '2': 'Tải lên'
        },
        xFilesSelected: {
          '0': '%{smart_count} ảnh đã tải lên',
          '1': '%{smart_count} ảnh đã tải lên',
          '2': '%{smart_count} ảnh đã tải lên'
        },
        saveChanges: 'Lưu thay đổi',
        done: 'Hoàn thành',
        editing: 'Đang thay đổi ảnh %{file}',
        xTimeLeft: '%{time} còn lại',
        cancel: 'Hủy',
        complete: 'Hoàn thành',
        addingMoreFiles: 'Đăng thêm ảnh',
        back: 'Quay lại',
        uploading: 'Hoàn thành'
      }
    },
    restrictions: {
      maxFileSize: 250000000,
      minNumberOfFiles: 1,
      maxNumberOfFiles: maxImage ? maxImage : 20,
      allowedFileTypes: ['image/*', '.heic', '.heif']
    },
    onBeforeFileAdded: (currentFile, files) => {
      if (currentFile.meta) {
        let year = new Date().getFullYear();
        let month = new Date().getMonth() + 1;
        let date = new Date().getDate();
        let timestamp = new Date().getTime();
        let newName =
          `${year}_${month < 10 ? `0${month}` : month}_${date < 10 ? `0${date}` : date}` +
          '_' +
          timestamp +
          '_' +
          currentFile.name;
        let modifiedFile = Object.assign({}, currentFile, {
          name: newName
        });
        return modifiedFile;
      }
      return currentFile;
    }
  })
    .use(XHRUpload, {
      endpoint: 'https://dev.westay.vn/merchant-api/upload-image',
      fieldName: 'file[]',
      limit: 20,
      formData: true
    })
    .on('complete', (result) => {
      let imgs = initImages;
      result.successful.map((res) => {
        let img = { name: res.meta.name.split('.')[0] + '.jpg', caption: '', type: typeImage };
        if (typeUpload.type === "setAvatarImage" || typeUpload.type === "setCoverImage") {
          imgs = [img];
        }
        else {
          imgs = [...imgs, img];
        }
      });

      uppy.getFiles().forEach((file) => {
        uppy.setFileState(file.id, {
          progress: { uploadComplete: true, uploadStarted: true }
        });
      });
      if (type_txt) {
        dispatch({ type: typeUpload.type, payload: { [`${type_txt}`]: { images: imgs } } });
      } else {
        dispatch({ type: typeUpload.type, payload: { images: imgs } });
      }
    })
    .on('file-removed', (file) => {
      let index = initImages.findIndex((i) => i.name === file.name);
      if (index > -1) {
        initImages.splice(index, 1);
        if (type_txt) {
          dispatch({ type: typeUpload.type, payload: { [`${type_txt}`]: { images: initImages } } });
        } else {
          dispatch({ type: typeUpload.type, payload: { images: initImages } });
        }
      }
    });

  return useMemo(
    () => (
      <Fragment>
        <Grid container className={classes.margin}>
          <section className={classes.marginLabel}>
            {label && (
              <Typography variant="h1" gutterBottom className="label main_label">
                {label}
              </Typography>
            )}
            {subLabel && (
              <Grid item className="normal_text">
                <span>{subLabel}</span>
              </Grid>
            )}
          </section>
          <Grid item xs={12}>
            <Dashboard
              uppy={uppy}
              trigger={'.UppyModalOpenerBtn'}
              showProgressDetails={true}
              note={'Bạn phải đăng ít nhất 1 ảnh, kích thước tối đa của mỗi ảnh là 25 MB'}
              height={height ? height : 450}
              proudlyDisplayPoweredByUppy={false}
            />
          </Grid>
        </Grid>
      </Fragment>
    ),
    []
  );
};

export default UppyImage;
