import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { DashboardCommand } from '../DashboardCommand';
import { DashboardMessage } from '../DashboardMessage';
import { Page } from '../models/Page';
import {
  DashboardViewAtom,
  LoadingAtom,
  SettingsAtom,
  ViewDataAtom,
  SearchReadyAtom,
  ModeAtom
} from '../state';
import { Messenger } from '@estruyf/vscode/dist/client';
import { EventData } from '@estruyf/vscode/dist/models';
import { NavigationType } from '../models';
import { GeneralCommands } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { routePaths } from '..';

export default function useMessages() {
  const navigate = useNavigate();
  const [loading, setLoading] = useRecoilState(LoadingAtom);
  const [pages, setPages] = useState<Page[]>([]);
  const [settings, setSettings] = useRecoilState(SettingsAtom);
  const [viewData, setViewData] = useRecoilState(ViewDataAtom);
  const [, setMode] = useRecoilState(ModeAtom);
  const [, setView] = useRecoilState(DashboardViewAtom);
  const [, setSearchReady] = useRecoilState(SearchReadyAtom);

  const messageListener = (event: MessageEvent<EventData<any>>) => {
    const message = event.data;

    switch (message.command) {
      case DashboardCommand.loading:
        setLoading(message.payload);
        break;
      case DashboardCommand.viewData:
        setViewData(message.payload);
        if (message.payload?.type === NavigationType.Media) {
          setView(NavigationType.Media);
          navigate(routePaths[NavigationType.Media]);
        } else if (message.payload?.type === NavigationType.Contents) {
          setView(NavigationType.Contents);
          navigate(routePaths[NavigationType.Contents]);
        } else if (message.payload?.type === NavigationType.Data) {
          setView(NavigationType.Data);
          navigate(routePaths[NavigationType.Data]);
        } else if (message.payload?.type === NavigationType.Taxonomy) {
          setView(NavigationType.Taxonomy);
          navigate(routePaths[NavigationType.Taxonomy]);
        } else if (message.payload?.type === NavigationType.Snippets) {
          setView(NavigationType.Snippets);
          navigate(routePaths[NavigationType.Snippets]);
        }
        break;
      case DashboardCommand.settings:
        setSettings(message.payload);
        break;
      case DashboardCommand.pages:
        setPages(message.payload);
        setLoading(undefined);
        break;
      case DashboardCommand.searchReady:
        setSearchReady(true);
        break;
      case GeneralCommands.toWebview.setMode:
        setMode(message.payload);
        break;
    }
  };

  useEffect(() => {
    Messenger.listen(messageListener);

    setLoading("loading");
    Messenger.send(DashboardMessage.getViewType);
    Messenger.send(DashboardMessage.getTheme);
    Messenger.send(DashboardMessage.getData);
    Messenger.send(DashboardMessage.getMode);

    return () => {
      Messenger.unlisten(messageListener);
    };
  }, ['']);

  return {
    loading,
    pages,
    viewData,
    settings
  };
}
