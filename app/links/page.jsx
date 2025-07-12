import { LinkCardGroup, LinkCard } from "@/components/server";
import { Telegram, Youtube, Twitch, Steam, Github } from "@/components/icons";
export default function Page() {
  return (
    <div className="block">
      <h1 className="h1">Ссылки</h1>
      <div className="row gap-24">
        <LinkCardGroup titleIcon={<Telegram />} title="Telegram">
          <LinkCard href="/Telegram" title="Канал" link="@nilmirktg" />
          <LinkCard href="/TelegramWatch" title="Канал с записями" link="@nilmirkwatchtg" />
        </LinkCardGroup>
        <LinkCardGroup titleIcon={<Youtube />} title="YouTube">
          <LinkCard href="/YouTube" title="Игровой канал" link="@nilmirk" />
          <LinkCard href="/YouTubeLive" title="Live канал" link="@nilmirkchat" />
        </LinkCardGroup>
        <LinkCardGroup titleIcon={<Twitch />} title="Twitch">
          <LinkCard href="/Twitch" title="Основной канал" link="@nilmirk" />
          <LinkCard href="/TwitchAFK" title="Live канал" link="@nilmirkAFK" />
        </LinkCardGroup>
        <LinkCardGroup title="Другое">
          <LinkCard href="/Steam" title="Steam" link="/nilmirk">
            <Steam />
          </LinkCard>
          <LinkCard href="/GitHub" title="GitHub" link="/nilmirk">
            <Github />
          </LinkCard>
        </LinkCardGroup>
      </div>
    </div >
  );
}