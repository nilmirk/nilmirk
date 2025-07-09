import { LinkCardGroup, LinkCard } from "@/components/blocks";
import { Telegram, Youtube, Twitch, Steam, Github } from "@/components/icons";
export default function InDev() {
  return (
    <div className="page v-64 w-100">
      <div className="v-32 w-100">
        <h1 className="h1">Ссылки</h1>
        <div className="h-24">
          <LinkCardGroup>
            <div className="h-12 center">
              <Telegram />Telegram
            </div>
            <LinkCard href="https://t.me/nilmirk" title="Канал" link="@nilmirk" />
            <LinkCard href="https://t.me/nilmirkchat" title="Чат" link="@nilmirkchat" />
            <LinkCard href="https://t.me/nilmirkwatch" title="Канал с записями" link="@nilmirkwatch" />
          </LinkCardGroup>
          <LinkCardGroup>
            <div className="h-12 center">
              <Youtube />YouTube
            </div>
            <LinkCard href="https://www.youtube.com/@nilmirkplay" title="Игровой канал" link="@nilmirk" />
            <LinkCard href="https://www.youtube.com/@nilmirklive" title="Live канал" link="@nilmirkchat" />
          </LinkCardGroup>
          <LinkCardGroup>
            <div className="h-12 center">
              <Twitch />Twitch
            </div>
            <LinkCard href="https://www.twitch.tv/nilmirk" title="Основной канал" link="@nilmirk" />
            <LinkCard href="https://www.twitch.tv/nilmirkafk" title="Live канал" link="@nilmirkAFK" />
          </LinkCardGroup>
          <LinkCardGroup>
            Другое
            <LinkCard href="https://steamcommunity.com/id/nilmirk/" title="Steam" link="/nilmirk">
              <Steam className="h4"/>
            </LinkCard>
            <LinkCard href="https://github.com/nilmirk" title="GitHub" link="/nilmirk">
              <Github className="h4"/>
            </LinkCard>
          </LinkCardGroup>
        </div>
        </div>
    </div>
  );
}