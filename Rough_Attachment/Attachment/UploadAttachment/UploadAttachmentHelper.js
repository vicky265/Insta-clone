import { toaster } from '@tekion/tap-components/v2/molecules/NotificationWrapper';

export const beforeUpload = (file) => {
  const fileSizeCheck = file.size / 1024 / 1024 < 1000;
  if (!fileSizeCheck) {
    toaster('error', __('File Size must be smaller than 1GB!'));
  }
  return fileSizeCheck;
};
