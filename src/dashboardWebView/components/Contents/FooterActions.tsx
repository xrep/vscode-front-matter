import * as React from 'react';
import * as l10n from '@vscode/l10n';
import { QuickAction } from '../Menu';
import { EyeIcon, GlobeEuropeAfricaIcon, TrashIcon } from '@heroicons/react/24/solid';
import { LocalizationKey } from '../../../localization';
import { openFile, openOnWebsite } from '../../utils';
import { useRecoilState } from 'recoil';
import { SelectedItemActionAtom } from '../../state';
import { CustomScript } from '../../../models';
import { CustomActions } from './CustomActions';

export interface IFooterActionsProps {
  filePath: string;
  contentType: string;
  websiteUrl?: string;
  scripts?: CustomScript[];
}

export const FooterActions: React.FunctionComponent<IFooterActionsProps> = ({
  filePath,
  contentType,
  websiteUrl,
  scripts
}: React.PropsWithChildren<IFooterActionsProps>) => {
  const [, setSelectedItemAction] = useRecoilState(SelectedItemActionAtom);

  return (
    <div className={`py-2 w-full flex items-center justify-evenly border-t border-t-[var(--frontmatter-border)] bg-[var(--frontmatter-sideBar-background)] group-hover:bg-[var(--vscode-list-hoverBackground)] rounded`}>
      {/* <ItemSelection filePath={filePath} show /> */}

      <QuickAction
        title={l10n.t(LocalizationKey.dashboardContentsContentActionsMenuItemView)}
        className={`text-[var(--frontmatter-secondary-text)]`}
        onClick={() => openFile(filePath)}>
        <span className={`sr-only`}>{l10n.t(LocalizationKey.dashboardContentsContentActionsMenuItemView)}</span>
        <EyeIcon className={`w-4 h-4`} aria-hidden="true" />
      </QuickAction>

      {
        websiteUrl && (
          <QuickAction
            title={l10n.t(LocalizationKey.commonOpenOnWebsite)}
            className={`text-[var(--frontmatter-secondary-text)]`}
            onClick={() => openOnWebsite(websiteUrl, filePath)}>
            <span className={`sr-only`}>{l10n.t(LocalizationKey.commonOpenOnWebsite)}</span>
            <GlobeEuropeAfricaIcon className={`w-4 h-4`} aria-hidden="true" />
          </QuickAction>
        )
      }

      <CustomActions
        filePath={filePath}
        contentType={contentType}
        scripts={scripts}
        showTrigger />

      <QuickAction
        title={l10n.t(LocalizationKey.commonDelete)}
        className={`text-[var(--frontmatter-secondary-text)] hover:text-[var(--vscode-statusBarItem-errorBackground)]`}
        onClick={() => setSelectedItemAction({ path: filePath, action: 'delete' })}>
        <span className={`sr-only`}>{l10n.t(LocalizationKey.commonDelete)}</span>
        <TrashIcon className={`w-4 h-4`} aria-hidden="true" />
      </QuickAction>
    </div>
  );
};