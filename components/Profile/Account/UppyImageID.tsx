import { DetailsReducerAction } from '@/store/Redux/Reducers/LTR/CreateListing/Step2/details';
import { ImageReducerAction } from '@/store/Redux/Reducers/LTR/CreateListing/Step2/images';
import { Grid } from '@material-ui/core';
import Uppy from '@uppy/core';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import { Dashboard } from '@uppy/react';
import Webcam from '@uppy/webcam';
import '@uppy/webcam/dist/style.css';
import XHRUpload from '@uppy/xhr-upload';
import React, { FC, Fragment, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import Cookies from 'universal-cookie';
import 'uppy/dist/uppy.min.css';
interface IProps {
  //   classes?: any;
  //   label?: string;
  //   subLabel?: string;
  //   initImages?: any;
  //   height?: number;
  //   typeUpload: { type: any };
  //   maxImage?: number;
  //   type_txt?: string;
  //   typeImage?: number;
  handleModalClose?: () => void;
  uppyModalOpen?: boolean;
}

// const useStyles = makeStyles<Theme>((theme: Theme) =>
//   createStyles({
//     margin: {
//       marginBottom: theme.spacing(4)
//     },
//     marginLabel: {
//       marginBottom: theme.spacing(2)
//     }
//   })
// );

const UppyImageID: FC<IProps> = (props) => {
  //   const classes = useStyles(props);
  const { t } = useTranslation();
  const { handleModalClose, uppyModalOpen } = props;
  //   const { label, subLabel, initImages, height, maxImage, typeUpload, type_txt, typeImage } = props;
  const dispatch = useDispatch<Dispatch<ImageReducerAction>>();
  const dispatch_detail = useDispatch<Dispatch<DetailsReducerAction>>();

  const uppy = Uppy({
    debug: true,
    autoProceed: false,
    restrictions: {
      // maxFileSize: 1000000,
      maxNumberOfFiles: 4,
      minNumberOfFiles: 3,
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
  });

  uppy.use(XHRUpload, {
    endpoint: 'https://dev.westay.vn/customer-api/upload-identity',
    headers: {
      authorization: `Bearer ${new Cookies().get('_token')}`
    },
    fieldName: 'file[]',
    limit: 20,
    formData: true
  });

  uppy.use(Webcam, {
    // onBeforeSnapshot: () => Promise.resolve(),
    // countdown: false,
    modes: ['picture'],
    mirror: true,
    facingMode: 'user',
    locale: {}
  });

  uppy.on('complete', (result) => {
    uppy.getFiles().forEach((file) => {
      uppy.setFileState(file.id, {
        progress: { uploadComplete: true, uploadStarted: true }
      });
    });
    // console.log('successful files:', result.successful);
    // console.log('failed files:', result.failed);
  });

  return useMemo(
    () => (
      <Fragment>
        <Grid container>
          <section>
            <h3>
              Upload 3 file ảnh hoặc chụp trực tiếp từ camera theo thứ tự: ID mặt trước, mặt sau,
              anh chụp chân dung cá nhân trực tiếp
            </h3>
            {/* {label && (
              <Typography variant="h1" gutterBottom className="label main_label">
                {label}
              </Typography>
            )}
            {subLabel && (
              <Grid item className="normal_text">
                <span>{subLabel}</span>
              </Grid>
            )} */}
          </section>
          <Grid item xs={12}>
            <Dashboard
              plugins={['Webcam']}
              uppy={uppy}
              // onRequestClose={handleModalClose}
              // closeModalOnClickOutside
              trigger={'.UppyModalOpenerBtn'}
              // open={uppyModalOpen}
              showProgressDetails={true}
              // note={'Bạn phải đăng ít nhất 1 ảnh, kích thước tối đa của mỗi ảnh là 25 MB'}
              // plugins={['Webcam']}
              proudlyDisplayPoweredByUppy={false}
            />
          </Grid>
        </Grid>
      </Fragment>
    ),
    []
  );
};

export default UppyImageID;
