'use client';

import { useRef, memo, KeyboardEvent, MouseEvent } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { Button } from '@/components/Button/Button';
import { PORTAL_CONTAINER_ID } from '@/constants';
import { useTagStore, useDeleteTagDialogStore } from '@/stores';
import { Text } from '@/ui/Text/Text';
import { getElementById } from '@/utils';
import { Gap } from '../Gap';
import { dialogContentStyle, dialogOverlayStyle } from './DeleteTagDialog.css';

export const DeleteTagDialog = memo(function DeleteTagDialog() {
  const cancelButtonRef = useRef<HTMLButtonElement | null>(null);
  const { deleteTag } = useTagStore();
  const { deleteTagId, isOpen, setIsOpen } = useDeleteTagDialogStore();
  const portalContainer = getElementById(PORTAL_CONTAINER_ID);

  const closeDialog = () => {
    setIsOpen(false);
  };

  const closeDialogByEnterKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (event.key === 'Enter') {
      closeDialog();
    }
  };

  const handleDeleteTag = async () => {
    if (!deleteTagId) {
      return;
    }

    closeDialog();
    await deleteTag(deleteTagId);
  };

  const DeleteTagByClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    await handleDeleteTag();
  };

  const DeleteTagByEnterKey = async (e: KeyboardEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (e.key === 'Enter') {
      await handleDeleteTag();
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal container={portalContainer}>
        <Dialog.Overlay className={dialogOverlayStyle} />
        <Dialog.Content className={dialogContentStyle}>
          <Text size="sm" weight="regular">
            이 태그를 삭제하시겠습니까?
          </Text>

          {/* <p style={{ fontSize: '14px' }}>
            {' '}
            dasdsadsa 이 태그를 삭제하시겠습니까?
          </p> */}

          <VisuallyHidden.Root>
            <Dialog.Title>이 태그를 삭제하시겠습니까?</Dialog.Title>
            <Dialog.Description>
              태그를 삭제하실 거라면 삭제 버튼을 눌러주세요.
            </Dialog.Description>
          </VisuallyHidden.Root>

          <div>
            <Button
              onClick={DeleteTagByClick}
              onKeyDown={DeleteTagByEnterKey}
              size="xs"
              background="danger"
              color="white"
              wide
            >
              삭제
            </Button>
            <Gap verticalSize="gap4" />
            <Dialog.Close asChild>
              <Button
                ref={cancelButtonRef}
                onClick={closeDialog}
                onKeyDown={closeDialogByEnterKey}
                size="xs"
                background="secondary"
                color="white"
                wide
              >
                취소
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
});
