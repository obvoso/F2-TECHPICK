'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DraggablePickListViewer, PickRecordHeader } from '@/components';
import { PickContentLayout } from '@/components/PickContentLayout';
import { PickContextMenu } from '@/components/PickContextMenu';
import { PickDraggableListLayout } from '@/components/PickDraggableListLayout';
import { PickDraggableRecord } from '@/components/PickRecord/PickDraggableRecord';
import { ROUTES } from '@/constants';
import {
  useResetPickFocusOnOutsideClick,
  useClearSelectedPickIdsOnMount,
  useFetchTagList,
} from '@/hooks';
import { usePickStore, useTreeStore } from '@/stores';

export default function FolderDetailPage() {
  const router = useRouter();
  const { folderId: stringFolderId } = useParams<{ folderId: string }>();
  const { fetchPickDataByFolderId, getOrderedPickListByFolderId } =
    usePickStore();
  const selectSingleFolder = useTreeStore((state) => state.selectSingleFolder);
  const folderId = Number(stringFolderId);
  const basicFolderMap = useTreeStore((state) => state.basicFolderMap);
  useResetPickFocusOnOutsideClick();
  useClearSelectedPickIdsOnMount();
  useFetchTagList();

  useEffect(
    function selectFolderId() {
      if (!isFolderIdValid(folderId)) {
        router.replace(ROUTES.UNCLASSIFIED_FOLDER);
        return;
      }

      selectSingleFolder(Number(folderId));
    },
    [folderId, router, selectSingleFolder]
  );

  useEffect(
    function loadPickDataByFolderIdFromRemote() {
      if (!isFolderIdValid(folderId)) {
        router.replace(ROUTES.UNCLASSIFIED_FOLDER);
        return;
      }

      fetchPickDataByFolderId(folderId);
    },
    [fetchPickDataByFolderId, folderId, router]
  );

  const isFolderIdValid = (folderId: number) => {
    if (Number.isNaN(folderId)) {
      return false;
    }

    return true;
  };

  if (!basicFolderMap) {
    return <div>loading...</div>;
  }

  const pickList = getOrderedPickListByFolderId(folderId);

  return (
    <PickContentLayout>
      <PickRecordHeader />
      <PickDraggableListLayout folderId={folderId} viewType="record">
        {pickList.map((pickInfo) => {
          return (
            <PickContextMenu
              basicFolderMap={basicFolderMap}
              pickInfo={pickInfo}
              key={pickInfo.id}
              data-pick-draggable={true}
            >
              <PickDraggableRecord key={pickInfo.id} pickInfo={pickInfo} />
            </PickContextMenu>
          );
        })}
      </PickDraggableListLayout>
    </PickContentLayout>
  );

  return (
    <DraggablePickListViewer
      pickList={getOrderedPickListByFolderId(folderId)}
      folderId={folderId}
    />
  );
}
