import { toaster } from '@tekion/tap-components/v2/molecules/NotificationWrapper';

export const beforeUpload = (file) => {
  const fileSizeCheck = file.size / 1024 / 1024 < 1000;
  if (!fileSizeCheck) {
    toaster('error', __('File Size must be smaller than 1GB!'));
  }
  return fileSizeCheck;
};

export const checkThumbnail = name => name.includes('.png') || name.includes('.jpg') || name.includes('.jpeg') || name.includes('.PNG') || name.includes('.JPG') || name.includes('.JPEG') || name.includes('.gif') || name.includes('.GIF') || name.includes('.ico') || name.includes('.ICO');
