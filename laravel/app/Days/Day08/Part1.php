<?php

namespace App\Days\Day08;

use App\Days\Solver;

class Part1 extends Solver
{

    const HEADER_LENGTH = 2;

    protected $entries = [];
    // node structure =>
    //   child nodes number
    //   entries number
    //   entries array
    //   child nodes array
    //   length of the node itself
    //   all other entries without header (all entries and child nodes)
    protected $tree = [];


    function __construct()
    {
        $this->readFile('/Day08/input.txt');
    }

    public function solve(): string
    {
        $this->parseInput();
        $this->tree = $this->parseNodeTree($this->entries, 1)['nodes'];
        return $this->sumAllEntries($this->tree);
    }

    protected function parseInput()
    {
        $this->entries = explode(" ", $this->file);
        $this->entries = array_map(function ($entry) {
            return intval($entry);
        }, $this->entries);
    }

    protected function parseNodeTree(array $entries, int $nodesOnLevel): array
    {
        $nodes = [];
        $previousNodeFinishIndex = 0;
        for ($i = 0; $i < $nodesOnLevel; $i++) {
            $nodeBody = array_slice($entries, $previousNodeFinishIndex);
            // metadataEntries, childNodes and length will be recalculated later
            $node = [
                'childNodesNumber' => $nodeBody[0],
                'metadataEntriesNumber' => $nodeBody[1],
                'metadataEntries' => [],
                'childNodes' => [],
                'length' => 0
            ];
            $innerNodesData = $this->parseNodeTree(array_slice($nodeBody, 2), $node['childNodesNumber']);
            $node['childNodes'] = $innerNodesData['nodes'];
            $node['metadataEntries'] = array_slice($innerNodesData['leftoverEntries'], 0, $node['metadataEntriesNumber']);
            $childNodesLength = array_reduce($node['childNodes'], function ($sum, $node) {
                return $sum + $node['length'];
            }, 0);
            $node['length'] = self::HEADER_LENGTH + $childNodesLength + $node['metadataEntriesNumber'];
            $previousNodeFinishIndex += $node['length'];
            array_push($nodes, $node);
        }
        return [
            'nodes' => $nodes,
            'leftoverEntries' => array_slice($entries, $previousNodeFinishIndex)
        ];
    }

    private function sumAllEntries(array $nodes): int
    {
        return array_reduce($nodes, function (int $sum, $node) {
            $nodeOwnEntriesSum = array_reduce($node['metadataEntries'], function (int $sum, int $entry) {
                return $sum + $entry;
            }, 0);
            $childEntriesSum = $this->sumAllEntries($node['childNodes']);
            return $sum + $nodeOwnEntriesSum + $childEntriesSum;
        }, 0);
    }


}




