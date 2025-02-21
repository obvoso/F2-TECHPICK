'use client';

import { Trash2Icon, ArchiveIcon } from 'lucide-react';
import { ROUTES } from '@/constants';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import { FolderLinkItem } from './FolderLinkItem';
import {
  folderTreeHeaderLayout,
  folderTreeHeaderTitleLayout,
} from './folderTreeHeader.css';
import { PickToFolderDropZone } from './PickToFolderDropZone';

export function FolderTreeHeader() {
  const { basicFolderMap, focusFolderId, hoverFolderId } = useTreeStore();

  const isUnclassifiedSelected = !!(
    basicFolderMap && focusFolderId === basicFolderMap['UNCLASSIFIED'].id
  );

  const isRecycleBinSelected = !!(
    basicFolderMap && focusFolderId === basicFolderMap['RECYCLE_BIN'].id
  );

  const isRootSelected = !!(
    basicFolderMap && focusFolderId === basicFolderMap['ROOT'].id
  );

  const isRootFolderHover =
    (basicFolderMap && basicFolderMap['ROOT'].id === hoverFolderId) ?? false;

  const isUnclassifiedFolderHover =
    (basicFolderMap && basicFolderMap['UNCLASSIFIED'].id === hoverFolderId) ??
    false;

  const isRecycleBinFolderHover =
    (basicFolderMap && basicFolderMap['RECYCLE_BIN'].id === hoverFolderId) ??
    false;

  return (
    <div className={folderTreeHeaderLayout}>
      {basicFolderMap && (
        <div>
          <div className={folderTreeHeaderTitleLayout}>
            <h1>정리함</h1>
          </div>

          <FolderLinkItem
            href={ROUTES.FOLDERS_ROOT}
            name="내 컬렉션"
            icon={ArchiveIcon}
            isSelected={isRootSelected}
            isHovered={isRootFolderHover}
          />

          <PickToFolderDropZone folderId={basicFolderMap['UNCLASSIFIED'].id}>
            <FolderLinkItem
              href={ROUTES.FOLDERS_UNCLASSIFIED}
              name="미분류"
              icon={ArchiveIcon}
              isSelected={isUnclassifiedSelected}
              isHovered={isUnclassifiedFolderHover}
            />
          </PickToFolderDropZone>
          <PickToFolderDropZone folderId={basicFolderMap['RECYCLE_BIN'].id}>
            <FolderLinkItem
              href={ROUTES.FOLDERS_RECYCLE_BIN}
              name="휴지통"
              icon={Trash2Icon}
              isSelected={isRecycleBinSelected}
              isHovered={isRecycleBinFolderHover}
            />
          </PickToFolderDropZone>
        </div>
      )}
      {/*<hr className={dividerStyle} />*/}
    </div>
  );
}
