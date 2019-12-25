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
import { CreateApartmentActions } from '@/store/Redux/Reducers/LTR/CreateListing/Basic/CreateApartment';
interface IProps {
  classes?: any;
  label?: string;
  subLabel?: string;
  initImg?: string;
  height?: number;
  maxImage?: number;
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

const AvatarUppyApartment: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { t } = useTranslation();
  const { label, subLabel, initImg, height, maxImage } = props;
  const dispatch = useDispatch<Dispatch<CreateApartmentActions>>();

  // useEffect(() => {
  //   if (initImg.length < 1) {
  //     dispatch({ type: 'SET_DISABLE_SUBMIT', payload: true });
  //   } else {
  //     dispatch({ type: 'SET_DISABLE_SUBMIT', payload: false });
  //   }
  // }, [initImg]);

  const initImage = async (initImg) => {
    let img = `${IMAGE_STORAGE_LG}` + initImg;
    await fetch(img)
      .then((res) => res.blob())
      .then((blob) => {
        uppy.addFile({
          name: initImg,
          data: blob
        });
        uppy.getFiles().forEach((file) => {
          uppy.setFileState(file.id, {
            progress: { uploadComplete: true, uploadStarted: true }
          });
        });
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    if (!!initImg) {
      initImage(initImg);
    }
  }, [initImg]);

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
      let img = initImg;
      result.successful.map((res) => {
        let imgNew = res.meta.name.split('.')[0] + '.jpg';
        img = imgNew;
      });

      uppy.getFiles().forEach((file) => {
        uppy.setFileState(file.id, {
          progress: { uploadComplete: true, uploadStarted: true }
        });
      });
      dispatch({ type: 'SET_AVATAR', payload: img });
    });
  return useMemo(
    () => (
      <Fragment>
        <Grid container className={classes.margin}>
          <section className={classes.marginLabel}>
            {label && (
              <Typography variant="h1" gutterBottom className="label sub_label">
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

export default AvatarUppyApartment;
