import {
  forwardRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import * as Select from '@radix-ui/react-select';
import {
  ChevronDown as ChevronDownIcon,
  FolderOpen as FolderOpenIcon,
} from 'lucide-react';
import { PORTAL_CONTAINER_ID } from '@/constants';
import { getElementById } from '@/utils';
import {
  folderSelectTriggerButtonStyle,
  folderSelectContentStyle,
  selectItemStyle,
  selectTextStyle,
  folderSelectViewport,
} from './FolderSelect.css';
import { FolderType } from '@/types';

export const FolderSelect = forwardRef<HTMLButtonElement, FolderSelectProps>(
  function TagPicker(
    { folderInfoList, selectedFolderId, setSelectedFolderId },
    tabFocusRef
  ) {
    const portalContainerElement = getElementById(PORTAL_CONTAINER_ID);
    const [open, setOpen] = useState(false);

    const openDialog = () => {
      setOpen(true);
    };

    const onEnterKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key !== 'Enter') {
        return;
      }

      openDialog();
    };

    return (
      <Select.Root
        open={open}
        onOpenChange={setOpen}
        value={selectedFolderId}
        onValueChange={(value) => {
          setSelectedFolderId(value);
        }}
      >
        <Select.Trigger
          className={folderSelectTriggerButtonStyle}
          ref={tabFocusRef}
          onKeyDown={onEnterKeyDown}
          onClick={openDialog}
        >
          <div className={folderSelectContentStyle}>
            <div className={selectItemStyle}>
              <FolderOpenIcon width={16} height={16} />

              <p className={selectTextStyle}>
                <Select.Value placeholder={'folder를 선택해주세요.'} />
              </p>
              <Select.Icon>
                <ChevronDownIcon size={16} />
              </Select.Icon>
            </div>
          </div>
        </Select.Trigger>

        <Select.Portal container={portalContainerElement}>
          <Select.Content
            className={`${folderSelectContentStyle} ${folderSelectViewport}`}
          >
            <Select.Viewport>
              {folderInfoList.map((folderInfo) => (
                <Select.Item
                  key={folderInfo.id}
                  value={`${folderInfo.id}`}
                  className={selectItemStyle}
                >
                  <FolderOpenIcon size={16} />
                  <p className={selectTextStyle}>
                    <Select.ItemText>{folderInfo.name}</Select.ItemText>
                  </p>

                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    );
  }
);

interface FolderSelectProps {
  folderInfoList: FolderType[];
  selectedFolderId: string;
  setSelectedFolderId: Dispatch<SetStateAction<string>>;
}
